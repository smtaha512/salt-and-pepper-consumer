require('dotenv').config();
const mongoose = require('mongoose');
const menus = require('./menu-seeds.json');

const { lodash } = require('../utils/libs/index')
const helpers = require('./seed-helpers');
const models = require('../models/index');
const repositories = require('../repositories/index');

const dbConnectionFns = require('../pre/db-connection');

// First set global env.
helpers.setEnvironment();

dbConnectionFns.estDBConnection()
  .then(() => lodash.groupBy(menus, 'menuName'))
  .then(data => Object.entries(data).map(d => ({key: d[0], value: d[1]})))
  .then((data) => {
    // TODO - do work here
    const addCategory = repositories.menu.addCategory(models);
    const createMenu = repositories.menu.createMenu(models);
    const pushRefToCategory = repositories.menu.pushRefToCategory(models);
    const createItem = repositories.item.createItem(models);

    const promised = data.map(menu => {
      const { key: menuName, value } = menu;
      return createMenu({title: menuName})
        .then(menuDoc => {
          const promised = value.map(v => {
            const categoryId = mongoose.Types.ObjectId();
            return addCategory(menuDoc, {_id: categoryId, title: v.categoryName})
              .then(() => categoryId)
              .then((categoryId) => {
                const promised = v.items.map(item => createItem({
                  categoryId,
                  title: item.title,
                  description: item.description,
                  price: Number(item.price) || 0,
                }));
                return Promise.all(promised);
              })
              .then(items => {
                const promised = items.map(iDoc => pushRefToCategory(iDoc));
                return Promise.all(promised);
              })
          });
          
          return Promise.all(promised);
        })
    })
    
    return Promise.all(promised)
  })
  .then(() => {
    console.log(`✅ All done "Menu" data updated...`);
    dbConnectionFns.closeDBConnection();
  })
  .catch(e => {
    console.log(`Something went wrong... `, e);
    dbConnectionFns.closeDBConnection();
  })
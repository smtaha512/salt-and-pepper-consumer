/**
 * @param {import('../../models/index')} models
 * @returns
 */
function getAllMenus(models) {
  return function () {
    return models.MenuModel.find().populate('catgories.$.items').exec();
  };
}

/**
 * @param {import('../../models/index')} models
 * @returns
 */
function createMenu(models) {
  return function (menuDetails) {
    const menu = new models.MenuModel(menuDetails);
    return menu.save();
  };
}

/**
 * @param {import('../../models/index')} models
 * @returns
 */
function addCategory(models) {
  return function (menu, category) {
    if (!category) {
      category = {
        description: 'A collection of item that does not belong to a category',
        items: [],
        title: 'Miscellaneous',
      };
    }
    return models.MenuModel.findByIdAndUpdate(
      menu._id,
      {
        $addToSet: {
          categories: category,
        },
      },
      { new: true }
    );
  };
}

/**
 * @param {import('../../models/index')} models
 *
 * @returns
 */
function pushRefToCategory(models) {
  return function (item) {
    console.log('item: ', item);
    return models.MenuModel.findOneAndUpdate(
      { 'categories._id': item.categoryId },
      {
        $addToSet: {
          'categories.$.items': item._id,
        },
      }
    );
  };
}

/**
 * @param {import('../../models/index')} models
 * @returns
 */
function popRefFromCategory(models) {
  return function (item) {
    return models.MenuModel.findOneAndUpdate(
      { 'categories._id': item.categoryId },
      {
        $pull: {
          'categories.$.items': item._id,
        },
      }
    );
  };
}

module.exports.addCategory = addCategory;
module.exports.createMenu = createMenu;
module.exports.getAllMenus = getAllMenus;
module.exports.popRefFromCategory = popRefFromCategory;
module.exports.pushRefToCategory = pushRefToCategory;

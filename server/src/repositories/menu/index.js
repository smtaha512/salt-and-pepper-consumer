/**
 * @param {import('../../models/index')} models
 * @returns
 */
function getAllMenus(models) {
  return function () {
    return models.MenuModel.find();
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

module.exports.addCategory = addCategory;
module.exports.createMenu = createMenu;
module.exports.getAllMenus = getAllMenus;

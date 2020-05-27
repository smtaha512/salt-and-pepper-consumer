function validateMenu(request, response, next) {
  const menu = request.body;
  const errors = [];
  if (!menu.title) errors.push('Title is required');
  if (menu.title > 20) errors.push('Title should be less than 20 charactors');

  if (errors.length > 0) {
    response.status(400).send(errors);
    return;
  }
  next();
}

module.exports.validateMenu = validateMenu;

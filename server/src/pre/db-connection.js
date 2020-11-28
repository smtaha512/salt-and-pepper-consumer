const mongoose = require('mongoose');
const { lodash: _ } = require('../utils/libs/index');

function estDBConnection() {
  const dbUrl = _.get(global, 'app.envConfig.dbUrl');
  if (!dbUrl) throw new Error('Must specify correct DB_URL');
  return mongoose
    .connect(dbUrl, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
};

const closeDBConnection = () => {
  mongoose.connection.close();
  process.exit(0);
}
process.on('SIGINT', closeDBConnection);

module.exports = {
  closeDBConnection,
  estDBConnection,
};

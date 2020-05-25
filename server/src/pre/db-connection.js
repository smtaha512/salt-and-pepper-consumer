const mongoose = require('mongoose');
const { lodash: _ } = require('@src/utils/libs');

const estDBConnection = function estDBConnection() {
  const dbUrl = _.get(global, 'app.envConfig.dbUrl');
  if (!dbUrl) throw new Error('Must specify correct DB_URL');
  mongoose
    .connect(dbUrl, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => void console.log('⛓  - Database/MLab connection established'))
    .catch((err) => void console.error(`Error connecting to mLab: `, err));
};

process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit(0);
});

module.exports = {
  estDBConnection,
};

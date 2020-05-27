const defaultConfig = {
  port: 4000,
};

module.exports = {
  development: (() => {
    const dbname = process.env.SAP_DB_NAME,
      dbpass = process.env.SAP_DB_PASSWORD,
      dbuser = process.env.SAP_DB_USERNAME;
    const dbUrl = `mongodb://${dbuser}:${dbpass}@ds253960.mlab.com:53960/${dbname}`;
    // const dbUrl = `mongodb://localhost:27017/saltandpepper`;
    return {
      dbUrl,
      ...defaultConfig,
      port: 4000,
      self: 'development',
    };
  })(),

  production: {
    ...defaultConfig,
    port: 9000,
    self: 'production',
  },

  staging: (() => {
    const dbpass = process.env.DBPWD || '<db-pass>';
    const dbuser = process.env.DBUSR || '<db-user>';
    const dbUrl = `mongodb://${dbuser}:${dbpass}@ds349065.mlab.com:49065/hommade`;
    return {
      ...defaultConfig,
      dbUrl,
      port: 4000,
      self: 'development',
    };
  })(),
};

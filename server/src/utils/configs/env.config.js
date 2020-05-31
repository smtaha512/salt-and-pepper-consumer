const defaultConfig = {
  port: 4000,
};

module.exports = {
  development: (() => {
    const dbname = process.env.SAP_DB_NAME,
      dbpass = process.env.SAP_DB_PASSWORD,
      dbuser = process.env.SAP_DB_USERNAME;
    const dbUrl = `mongodb://${dbuser}:${dbpass}@ds253960.mlab.com:53960/${dbname}`;
    return {
      dbUrl,
      ...defaultConfig,
      port: 4000,
      self: 'development',
    };
  })(),

  production: (() => {
    const dbname = process.env.SAP_DB_NAME;
    const dbpass = process.env.SAP_DB_PASSWORD || '<db-pass>';
    const dbuser = process.env.SAP_DB_USERNAME || '<db-user>';
    const dbUrl = `mongodb://${dbuser}:${dbpass}@ds253960.mlab.com:53960/${dbname}`;
    return {
      ...defaultConfig,
      dbUrl,
      port: 4000,
      self: 'production',
    };
  })(),
};

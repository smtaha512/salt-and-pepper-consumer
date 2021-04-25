const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioVerifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const stripeSecret = process.env.STRIPE_SECRET;
const stripeEndpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const defaultConfig = {
  port: 4000,
  stripeEndpointSecret,
  stripeSecret,
  twilioAccountSid,
  twilioAuthToken,
  twilioVerifyServiceSid,
};

module.exports = {
  development: (() => {
    const dbname = process.env.SAP_DB_NAME;
    const dbUrl = `mongodb://localhost:27017/${dbname}`;
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
    const dbUrl = `mongodb+srv://${dbuser}:<${dbpass}>@cluster0.o8buz.mongodb.net/${dbname}?retryWrites=true&w=majority`;
    return {
      ...defaultConfig,
      dbUrl,
      port: 80,
      self: 'production',
    };
  })(),
};

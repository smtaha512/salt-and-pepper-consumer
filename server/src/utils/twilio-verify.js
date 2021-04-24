function twilioVerify() {
  const twilioClient = require('twilio');
  const { lodash: _ } = require('./libs/index');
  const twilioAccountSid = _.get(global, 'app.envConfig.twilioAccountSid');
  const twilioAuthToken = _.get(global, 'app.envConfig.twilioAuthToken');
  const twilioVerifyServiceSid = _.get(global, 'app.envConfig.twilioVerifyServiceSid');
  const twilio = twilioClient(twilioAccountSid, twilioAuthToken);
  const twilioVerifyService = twilio.verify.services(twilioVerifyServiceSid);

  function sendVerificationCode({ to } = { to: '' }) {
    return twilioVerifyService.verifications.create({ channel: 'sms', to });
  }

  function verifyCode({ code, to } = { code: '', to: '' }) {
    return twilioVerifyService.verificationChecks
      .create({ code, to })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((res) => {
        console.log(res);
        throw res;
      });
  }
  return { sendVerificationCode, verifyCode };
}

module.exports.twilioVerify = twilioVerify;

var nodemailer = require('nodemailer');
const config   = require('./../../config/appConfig');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailAuthUser,
    pass: config.mailAuthPass
  }
});

module.exports = function sendEmail(options){

  var mailOptions = {
    from: config.fromEmail,
    to: options.to,
    subject: options.subject,
    text: options.message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

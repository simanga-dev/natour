const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // const transporter = nodemailer.createTransport({
  //     service: "Gmail",
  //     auth: {
  //         user: process.env.EMAIL_USERNAME,
  //         pass: process.env.EMAIL_PASS
  //     }
  // })
  //

  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '8035c8602bca52',
      pass: '62735c2464fc60',
    },
  });

    const mailOption = {
        From: "Hendry Khoza <h3khoza@gmail.com>",
        to: options.mail,
        subject: options.subject,
        text: options.message
    }

    await transport.sendMail(mailOption)
};

module.exports = sendEmail

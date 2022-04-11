const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, content) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER, // generated ethereal user
      pass: process.env.SENDER_PASSWORD, // generated ethereal password
    },
  });

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"👻" <${process.env.SENDER}>`, // sender address
      to: `${email.join(',')}`, // list of receivers
      subject: `${subject}`, // Subject line
      html: `${content}`, // html body
    });
    // console.log(info);
    return info;
  } catch (error) {
    console.log('Send Email Error', error);
    return error
  }
}

module.exports = sendEmail;
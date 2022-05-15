const nodemailer = require('nodemailer');

exports.notifyGroupUsers = (event) => {
  fileUploadNotifyUsers(JSON.parse(Buffer.from(event.data, 'base64').toString()));
};

const fileUploadNotifyUsers = (messagePayload) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: messagePayload.userEmails,
    subject: "From Eduhub - A new file has been uploaded",
    text: 'Hi, a new file has been uploaded in the ' +  messagePayload.group + " group \n" +
        "File name: " + messagePayload.file.name + " File url: " + messagePayload.file.url
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

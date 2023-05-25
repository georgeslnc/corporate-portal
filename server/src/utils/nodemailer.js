const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mail.ru', //* адрес smt servera для отправки email(mail.ru smtp)
    port: 465, //* port smtp (mail.ru)
    secure: true, //* true for 465 , false for other ports!!!
    auth: {
      user: 'softmaster@internet.ru', //* почтовый ящик с которого отправляются письма
      pass: 'Af6V99febry3AvrsgmEV', //* внешний пароль создается отдельно от обычного
    },
  },
  {
    from: 'Mailer Test <mailertest80@mail.ru>',

  },
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log('Email sent:   ', info);
  });
};
module.exports = mailer;

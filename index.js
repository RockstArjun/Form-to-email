/* 
Name: Arjun Chauhan (@RockstArjun)
Github: https://github.com/Rockstarjun
PortFolio : https://arjunchauhan.netlify.app
*/

const express = require('express');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { body } = require('express-validator');
const cors = require('cors');
console.log("Running")
const app = express()
const port = 8000
app.use(express.json())
app.use(cors())
app.post('/api/auth',[
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
], (req, res) => {
  res.send(req.body);
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'yourEmail@example.com',
      pass: 'yourPassword'
    }
  }));
  //  If you getting an Error regarding sending email using the entered details of your email make sure you have enable third party usage of your provided email account.
  var mailOptions = {
    from: 'yourEmail@example.com',
    to: 'friendsEmail@example.com',
    subject: 'subject of email',
    text: "Message you want to send" 
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });  
});

app.listen(port);
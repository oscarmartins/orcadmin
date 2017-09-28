
'use strict'
const nodemailer = require('nodemailer')
const knex = require('../config/knex')

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
  console.log('account before', account)
  account = {user: 'info@orc-project.com', pass: '2p2ssword'}
  console.log('account after', account)
  if (err) {
    console.log(err)
  }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.orc-project.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  })

  // setup email data with unicode symbols
  let mailOptions = {
    from: account.user, // sender address
    to: 'oscar.martins@koolsite.pt', // list of receivers
    subject: 'Hello ✔✔', // Subject line
    text: 'Hello world? ✔', // plain text body
    html: '<b>Hello world?</b>' // html body
  }
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  })
})
/**
  from - The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted ’“Sender Name” sender@server.com‘, see Address object for details
  to - Comma separated list or an array of recipients email addresses that will appear on the To: field
  cc - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
  bcc - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
  subject - The subject of the email
  text - The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…’})
  html - The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…‘})
  attachments - An array of attachment objects (see Using attachments for details). Attachments can be used for embedding images as well.

var message = {
  from: 'sender@server.com',
  to: 'receiver@sender.com',
  subject: 'Message title',
  text: 'Plaintext version of the message',
  html: '<p>HTML version of the message</p>'
}
*/

module.exports = {
  sendMail: async (message) => {
    let account = {}
    await knex('mailer').select().then((err, result) => {
      if (err) {
        console.log(err)
      }
      account = result[0]
    })
    console.log(account)
  }
}

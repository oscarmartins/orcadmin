const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const app = express()

mongoose.connect('localhost:27017/orcadmin')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')
const knex = require('./config/knex')
// const mailerAlterTable = require('./models/mailer')
// const orcmailer = require('./controllers/orcmailer')

app.use(session({
  secret: 'mysupersecret',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 3600}
}))

require('./routes')(app)

sequelize.sync({force: false})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
    // mailerAlterTable.alterTable(knex)
    knex('mailer').select()
      .then((result) => {
        if (result) {
          console.log('result', result)
        }
      })
    /** .createTestAccount(function (err, result) {
      console.log(err)
      console.log('-----')
      console.log(result)
    }) **/
  })

const knex = require('../config/knex')
const mailer = require('../models/mailer').schema()
module.exports = {
  async fetchProfiles (req, res) {
    try {
      console.log('### fetchProfiles ###')
      await knex('mailer').select('*').then((result) => {
        console.log(result)
        return res.send({'fetchProfiles': result})
      })
    } catch (err) {
      console.log('fetchProfiles error', err)
      return res.status(400).send({
        error: err,
        'fetchProfiles': 'error'
      })
    }
  },
  async new (req, res) {
    try {
      const { name, host, port, secure, user, pass, description } = req.body
      let error = null
      if (!name || name.length === 0) {
        error = 'field name is requerid.'
      } else if (!host || host.length === 0) {
        error = 'field host is requerid.'
      } else if (!port) {
        error = 'field port is requerid.'
      } else if (!user || user.length === 0) {
        error = 'field user is requerid.'
      } else if (!pass || pass.length === 0) {
        error = 'field pass is requerid.'
      } else if (secure && description) {
        console.log('ok')
      }
      if (error) {
        return res.send({error: error})
      }
      mailer.name = name
      mailer.port = port
      mailer.host = host
      mailer.user = user
      mailer.pass = pass
      mailer.secure = secure
      mailer.date = new Date()
      mailer.description = description
      console.log(mailer)
      const result = await knex('mailer').insert(mailer, 'id')
      console.log(result)
      return res.send({'success': '1'})
    } catch (e) {
      return res.status(400).send({error: e.message})
    }
  }
}

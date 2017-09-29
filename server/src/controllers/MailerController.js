const mailer = require('../config/knex')('mailer')

module.exports = {
  async fetchProfiles (req, res) {
    try {
      console.log('### fetchProfiles ###')
      await mailer.select().then((result) => {
        console.log(result)
        res.send({'fetchProfiles': result})
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
      console.log('### new ###')
      const { name, host, port, secure, user, pass, description } = req.body
      if (name && host && port && secure && user && pass && description) {
        console.log(1)
      }
      console.log(req.body)
      res.send({'fetchProfiles': {}})
    } catch (err) {
      console.log('fetchProfiles error', err)
      return res.status(400).send({
        error: err,
        'fetchProfiles': 'error'
      })
    }
  }
}

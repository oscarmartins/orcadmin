const environment = process.env.NODE_ENV || 'development'
const config = require('../../../orccontext')['pg_database'][environment]

module.exports = require('knex')(config)

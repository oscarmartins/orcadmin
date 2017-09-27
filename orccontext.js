// config secret file
module.exports = {
  pg_database: {
    development: {
      /**connection: 'postgres://hostname/database_name'**/
      client: 'pg',
      connection: {
        "host": "",
        "database": "",
        "user": "",
        "password": ""
      }
    }      
  }
}

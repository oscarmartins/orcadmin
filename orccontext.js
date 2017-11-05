
// config secret file
module.exports = {
  pg_database: {
    development: {
      /**connection: 'postgres://hostname/database_name'**/
      client: 'pg',
      connection: {
        "host": "orcseven.com",
        "database": "my_life",
        "user": "oscar",
        "password": "238229700"
      },
      useNullAsDefault: true
    }      
  },
  jwtSecret: 'orcsecret'
}

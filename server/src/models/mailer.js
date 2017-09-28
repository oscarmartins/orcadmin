module.exports = {
  make: (knex) => {
    try {
      knex.schema.createTable('mailer', (table) => {
        console.log(table)
        table.increments()
        table.text('name').notNullable()
        table.text('host').notNullable()
        table.integer('port').notNullable()
        table.text('description')
        table.boolean('secure').defaultTo(false).notNullable()
        table.datetime('date').notNullable()
      }).then((err, result) => {
        if (err) {
          console.log('error', err)
        } else {
          console.log('iook', result)
        }
      })
    } catch (error) {
      console.log(error)
    }
  },
  drop: (knex) => {
    knex.schema.dropTable('mailer').then(() => {
      console.log('drop table: mailer ')
    })
  }
}

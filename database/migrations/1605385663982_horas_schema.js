'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HorasSchema extends Schema {
  up () {
    this.create('horas', (table) => {
      table.increments()
      table.date('data')
      table.datetime('inicio')
      table.datetime('saida')
      table.datetime('retorno')
      table.datetime('fim')
      table.time('total')
      table.longtext('obs')
      table.int('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('horas')
  }
}

module.exports = HorasSchema

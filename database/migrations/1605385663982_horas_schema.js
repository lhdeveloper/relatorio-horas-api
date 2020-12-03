'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HorasSchema extends Schema {
  up () {
    this.create('horas', (table) => {
      table.increments()
      table.date('data')
      table.text('inicio')
      table.text('saida')
      table.text('retorno')
      table.text('fim')
      table.time('total')
      table.longtext('obs')
      table.int('user_id')
      table.text('saida2')
      table.text('saida3')
      table.text('saida4')
      table.text('retorno2')
      text.table('retorno3')
      text.table('retorno4')
      table.timestamps()
    })
  }

  down () {
    this.drop('horas')
  }
}

module.exports = HorasSchema

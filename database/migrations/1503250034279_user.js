'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('nome').notNullable()
      table.string('sobrenome').notNullable()
      table.string('idade').notNullable()
      table.string('cidade').notNullable()
      table.string('telefone').notNullable()
      table.string('imagem', 255).notNullable()
      table.string('cargo')
      table.string('valor_hora')
      table.text('resumo', 'longtext')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

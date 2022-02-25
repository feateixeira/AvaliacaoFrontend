
exports.up = function(knex) {
  return knex.schema.createTable('clientes', function(table) {
    table.increments();

    table.string('nome').notNullable();
    table.string('cpf').notNullable();
    table.string('endereco').notNullable();
    table.string('telefone').notNullable();
    table.string('email').notNullable();

    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users')
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('clientes');
};

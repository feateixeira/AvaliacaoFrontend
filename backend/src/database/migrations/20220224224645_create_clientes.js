
exports.up = function(knex) {
  return knex.schema.createTable('clientes', function(table) {
    table.increments();

    table.string('nome').notNullable();
    table.string('cpf').notNullable();
    table.string('cep').notNullable();
    table.string('logradouro').notNullable();
    table.string('bairro').notNullable();
    table.string('cidade').notNullable();
    table.string('complemento').notNullable();
    table.string('uf', 2).notNullable();
    table.string('telefone').notNullable();
    table.string('email').notNullable();

    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users')
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('clientes');
};

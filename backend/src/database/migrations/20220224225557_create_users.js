exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.string('id').primary();
        table.string('user').notNullable();
        table.string('senha').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};

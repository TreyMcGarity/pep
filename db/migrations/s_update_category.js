/**
 * Migration: add user ownership and visual fields to category table.
 * user_id is nullable so existing seed data is preserved.
 */
exports.up = function (knex) {
  return knex.schema.alterTable('category', (table) => {
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('color', 20).defaultTo('#8FB3C6'); // accent color for the card
    table.integer('sort_order').defaultTo(0);
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('category', (table) => {
    table.dropColumn('user_id');
    table.dropColumn('color');
    table.dropColumn('sort_order');
    table.dropColumn('updated_at');
  });
};

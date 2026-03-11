/**
 * Migration: extend the project table with user ownership, links, and metadata.
 * user_id is nullable so existing seed data is preserved.
 */
exports.up = function (knex) {
  return knex.schema.alterTable('project', (table) => {
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.integer('year');
    table.string('url', 500);        // live demo / deployment URL
    table.string('source_url', 500); // GitHub / source link
    table.string('image_url', 500);  // preview image
    table.text('tech_stack');        // JSON-stringified array e.g. '["TypeScript","Next.js"]'
    table.integer('sort_order').defaultTo(0);
    table.boolean('is_featured').defaultTo(false);
    table.boolean('is_active').defaultTo(true);
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('project', (table) => {
    table.dropColumn('user_id');
    table.dropColumn('year');
    table.dropColumn('url');
    table.dropColumn('source_url');
    table.dropColumn('image_url');
    table.dropColumn('tech_stack');
    table.dropColumn('sort_order');
    table.dropColumn('is_featured');
    table.dropColumn('is_active');
    table.dropColumn('updated_at');
  });
};

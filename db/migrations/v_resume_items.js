/**
 * Migration: resume_items table.
 * Individual entries within a resume section (jobs, degrees, skills, etc.).
 */
exports.up = function (knex) {
  return knex.schema.createTable('resume_items', (table) => {
    table.increments('id').primary();
    table.integer('section_id').unsigned().notNullable()
      .references('id').inTable('resume_sections').onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.string('title', 200);    // e.g. job title, degree name, skill
    table.string('subtitle', 200); // e.g. company, institution
    table.text('description');     // bullet points / detail text
    table.string('location', 200);
    table.date('start_date');
    table.date('end_date');        // NULL when is_current is true
    table.boolean('is_current').defaultTo(false);
    table.integer('sort_order').defaultTo(0);
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('resume_items');
};

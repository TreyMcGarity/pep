/**
 * Migration: resume_sections table.
 * Groups resume items by type (experience, education, skills, etc.).
 */
exports.up = function (knex) {
  return knex.schema.createTable('resume_sections', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    // Section type drives icon/layout hints on the frontend
    table.string('type', 50).notNullable(); // 'experience' | 'education' | 'skills' | 'summary' | 'certifications'
    table.string('title', 200).notNullable();
    table.integer('sort_order').defaultTo(0);
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('resume_sections');
};

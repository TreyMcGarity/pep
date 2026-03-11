/**
 * Migration: create users table.
 * Stores account credentials and profile info.
 * Runs after category.js and project.js (alphabetical order: r > p).
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 255).notNullable().unique();
    table.string('password_hash', 255).notNullable(); // bcrypt hash
    table.string('first_name', 100);
    table.string('last_name', 100);
    table.string('display_name', 200);  // shown publicly (e.g. "Trey McGarity")
    table.string('title', 200);          // tagline (e.g. "Software Developer")
    table.text('bio');
    table.string('avatar_url', 500);
    table.string('linkedin_url', 500);
    table.string('github_url', 500);
    table.string('website_url', 500);
    table.string('theme', 10).defaultTo('dark'); // 'dark' | 'light'
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};

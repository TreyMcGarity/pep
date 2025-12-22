/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return (async () => {
		await knex.schema.createTable('project', function(table) {
			table.increments('id').primary();
			table.string('name').notNullable();
			table.text('description');
			// create the category_id column before adding the foreign constraint
			table.integer('category_id').unsigned().notNullable();
			table.foreign('category_id').references('id').inTable('category').onDelete('CASCADE');
			table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
		});
	})();
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTableIfExists('project');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('project').del();
  await knex('project').insert([
    { name: 'Website Redesign', description: 'Update the public website', category_id: 2 },
    { name: 'API Development', description: 'Build the new API', category_id: 2 },
    { name: 'Product Launch', description: 'Marketing campaign for launch', category_id: 2 }
  ]);
};

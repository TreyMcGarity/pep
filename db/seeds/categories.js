/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del();
  await knex('category').insert([
    { name: 'ServiceNow', description: 'Design, build, and customize enterprise workflows on the ServiceNow platform, including custom applications, data models, security rules, UI Builder experiences, and integrations that support ITSM, operations, and business process automation.' },
    { name: 'Full-Stack Dev', description: 'End-to-end software engineering projects covering frontend, backend, and databases. Focused on scalable secure architectures, clean APIs, authentication, and production-ready user interfaces using modern web technologies.' },
    { name: 'Data Science', description: 'Projects centered on data analysis, modeling, and insight generation. Includes data cleaning, exploratory analysis, statistical modeling, machine learning, and visualization to support informed decision-making.' },
    { name: 'Game Dev', description: 'Interactive and real-time systems built for games and simulations. Covers gameplay mechanics, physics, AI behavior, tooling, and performance-conscious development using game engines and custom code.' }
  ]);
};

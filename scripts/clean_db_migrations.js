const { Client } = require('pg');

const cfg = {
  host: process.env.PG_HOST || '127.0.0.1',
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'password',
  database: process.env.PG_DATABASE || 'pep_dev'
};

async function clean() {
  const c = new Client(cfg);
  try {
    await c.connect();
    console.log('Dropping project and category tables if exist...');
    await c.query('DROP TABLE IF EXISTS project CASCADE');
    await c.query('DROP TABLE IF EXISTS category CASCADE');
    console.log('Removing migration records for our two migrations...');
    await c.query("DELETE FROM knex_migrations WHERE name IN ('20251222040625_category.js','20251222040640_project.js')");
    console.log('Clean complete');
  } catch (e) {
    console.error('clean error:', e.message || e);
    process.exitCode = 2;
  } finally {
    await c.end();
  }
}

clean();

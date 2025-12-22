const { Client } = require('pg');

const cfg = {
  host: process.env.PG_HOST || '127.0.0.1',
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'password',
  database: process.env.PG_DATABASE || 'pep_dev'
};

async function inspect() {
  const c = new Client(cfg);
  try {
    await c.connect();
    const tables = await c.query("SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename");
    console.log('tables:', tables.rows.map(r=>r.tablename));
    const cat = await c.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='category' ORDER BY ordinal_position");
    const proj = await c.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='project' ORDER BY ordinal_position");
    console.log('category columns:', cat.rows);
    console.log('project columns:', proj.rows);
  } catch (e) {
    console.error('inspect error:', e.message || e);
  } finally {
    await c.end();
  }
}

inspect();

const { Client } = require('pg');

const host = process.env.PG_HOST || '127.0.0.1';
const port = process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432;
const user = process.env.PG_USER || 'postgres';
const password = process.env.PG_PASSWORD || 'password';
const dbName = process.env.PG_DATABASE || 'pep_dev';

async function ensureDatabase() {
  const client = new Client({ host, port, user, password, database: 'postgres' });
  try {
    await client.connect();
    const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    if (res.rowCount === 0) {
      console.log(`Database ${dbName} does not exist — creating...`);
      // Use identifier quoting to allow hyphens etc. This is intended for local/dev use only.
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Created database ${dbName}`);
    } else {
      console.log(`Database ${dbName} already exists`);
    }
  } catch (err) {
    console.error('Error ensuring database exists:', err.message || err);
    process.exitCode = 2;
  } finally {
    await client.end().catch(()=>{});
  }
}

ensureDatabase();

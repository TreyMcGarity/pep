/**
 * Knex configuration for PostgreSQL.
 * Loads .env.local so migration scripts pick up the same credentials as Next.js.
 */
require('fs').existsSync('.env.local') &&
  require('fs').readFileSync('.env.local', 'utf8')
    .split('\n')
    .forEach(line => {
      const [key, ...val] = line.split('=');
      if (key && !key.startsWith('#') && val.length) {
        process.env[key.trim()] = val.join('=').trim();
      }
    });

const common = {
  client: 'pg',
  connection: {
    host: process.env.PG_HOST || '127.0.0.1',
    port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'password',
    database: process.env.PG_DATABASE || 'pep_dev'
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

module.exports = {
  development: common,
  production: {
    ...common,
    // in production you might want to read a full DATABASE_URL
    // and set ssl: { rejectUnauthorized: false }
  }
};

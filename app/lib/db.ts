/**
 * Singleton Knex instance for PostgreSQL.
 * Reuses the connection across hot reloads in development.
 */
import Knex from 'knex';

const globalForDb = globalThis as unknown as { db: Knex.Knex | undefined };

const db =
  globalForDb.db ??
  Knex({
    client: 'pg',
    connection: {
      host: process.env.PG_HOST || '127.0.0.1',
      port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'password',
      database: process.env.PG_DATABASE || 'pep_dev',
    },
    pool: { min: 0, max: 10 },
  });

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;

export default db;

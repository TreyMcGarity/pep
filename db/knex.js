/**
 * Simple knex instance export. Use `require('./db/knex')` or import via ES module interop.
 */
const config = require('../knexfile');
const env = process.env.NODE_ENV || 'development';
const knex = require('knex');

module.exports = knex(config[env]);

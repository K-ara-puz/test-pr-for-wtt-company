const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'usersForWttCompany',
  password: 'root',
  port: 5432,
});

module.exports.pool = pool;
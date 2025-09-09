// db.js
const { Pool } = require("pg");
require("dotenv").config();

// Use DATABASE_URL from Render environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Render external connections
  },
});

// Test connection
(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to Postgres:", res.rows[0].now);
  } catch (err) {
    console.error("Postgres connection error:", err);
  }
})();

module.exports = pool;

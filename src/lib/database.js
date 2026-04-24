import { Pool } from 'pg';

// Setup connection pool for PostgreSQL
// This uses environment variables for configuration.
// Make sure to add these to your .env.local file:
// POSTGRES_USER=your_username
// POSTGRES_PASSWORD=your_password
// POSTGRES_HOST=localhost
// POSTGRES_PORT=5432
// POSTGRES_DB=your_database_name

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  database: process.env.POSTGRES_DB || 'personal_branding',
  // You can also use a connection string directly:
  // connectionString: process.env.DATABASE_URL
});

export async function query(text, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

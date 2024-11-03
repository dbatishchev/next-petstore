import { execSync } from 'child_process'
import { randomUUID } from 'crypto'

export async function setup() {
  // Generate unique database name for tests
  const dbName = `test_${randomUUID()}`.replace(/-/g, '_')
  process.env.DATABASE_URL = `postgresql://postgres:postgres@localhost:5432/${dbName}`

  // TODO: use docker-compose to start the database

  // Create test database and run migrations
  execSync('npx prisma migrate deploy', { stdio: 'inherit' })
  
  // Run the seed script
  execSync('npx prisma db seed', { stdio: 'inherit' })
}

export async function teardown() {
  // Optional: Clean up the test database
  const dbName = process.env.DATABASE_URL?.split('/').pop()
  execSync(`psql -U postgres -c "DROP DATABASE IF EXISTS ${dbName}"`)
}

import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();



const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  POSTGRES_DEV_DB,
  ENV,
} = process.env;

var databaseType = POSTGRES_DEV_DB;
if (ENV === 'test') {
  databaseType = POSTGRES_TEST_DB;
}

const client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;

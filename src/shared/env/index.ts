import dotenv  from 'dotenv';

dotenv.config();

export const env = {
  api_port:process.env.PORT || 3003,
  hash_code:process.env.HASH_CODE || 'TWluaGEgcmVkZSBzb2NpYWwg',
  db_host:process.env.DB_HOST || 'localhost',
  db_port:process.env.DB_PORT || 5432,
  db_database:process.env.DB_DATABASE || 'social',
  db_username:process.env.DB_USERNAME || 'yazalde',
  db_password:process.env.DB_PASSWORD || 'docker'
}

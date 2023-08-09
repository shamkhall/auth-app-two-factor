import { config as envConfig } from 'dotenv'

envConfig({path: '.env.example'});
export const config = {
    PORT: 3000,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    HASH_SALT: process.env.HASH_SALT,
    JWT_EXPIRE: process.env.JWT_EXPIRE
}

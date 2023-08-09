import { config as envConfig } from 'dotenv'

envConfig({path: '.env.example'});
export const config = {
    PORT: 3000,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING
}

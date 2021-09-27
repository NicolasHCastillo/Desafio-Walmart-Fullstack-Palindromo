import { config } from 'dotenv';
config();

const { MONGODB_URI , DB_NAME , DB_NAME_TEST , PORT , NODE_ENV } = process.env;

const DB_ENV = {
    test: DB_NAME_TEST,
    production: DB_NAME,
    development: DB_NAME
}

const appConfig = {
    DB_URI: `${MONGODB_URI}${DB_ENV[NODE_ENV]}`,
    PORT
}

export default appConfig;
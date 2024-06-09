// import pg from 'pg'
import Sequilize from 'sequelize'
import { settings } from '../settings.js'

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = settings.databaseSettings;

const config = {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres'
}
export const sequelize = new Sequilize(DB_NAME, DB_USER, DB_PASSWORD, config)


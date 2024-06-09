import { sequelize } from './db.js'
import { UsersModel } from '../../users/models/users.model.js'

const models = [UsersModel]

export const connectionDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync()
        console.log('all model sync.')

      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
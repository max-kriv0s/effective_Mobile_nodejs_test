import { where } from 'sequelize'
import { UsersModel } from '../models/users.model.js'

export class UsersRepository {
    constructor() {
        this.usersModel = UsersModel
    }

    async getTransaction() {
        return this.usersModel.sequelize.transaction()
    }

    async create(createUserDto, transaction = undefined) {
        return this.usersModel.create(createUserDto, { transaction})
    }

    async update(id, updateUserDto, transaction = undefined) {
        return this.usersModel.update(updateUserDto, { where: { id }, transaction})
    }
}

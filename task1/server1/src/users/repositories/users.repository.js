import { UserModel } from '../models/user.model.js'

export class UsersRepository {
    constructor() {
        this.usersModel = UserModel
    }

    async getTransaction() {
        return this.usersModel.sequelize.transaction()
    }

    async getUserById(id) {
        return this.usersModel.findOne({ where: { id }})
    }

    async create(createUserDto, transaction = undefined) {
        return this.usersModel.create(createUserDto, { transaction})
    }

    async update(id, updateUserDto, transaction = undefined) {
        return this.usersModel.update(updateUserDto, { 
            where: { id }, 
            transaction, 
            returning: true, 
            plain: true
        })
    }

    async save(user, transaction = undefined) {
        user.save()
    }
}

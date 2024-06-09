import { UsersModel } from '../models/users.model.js'

export class UsersQueryRepository {
    constructor() {
        this.usersModel = UsersModel
    }

    async getUsers() {
        const users = await this.usersModel.findAll()
        return users.map((user) => this.convertToView(user))
    }

    async getUserById(id) {
        const user = await this.usersModel.findOne({
            where: {
                id
            }
        })
        return this.convertToView(user)
    }

    convertToView(user) {
        return {
            id: user.id,
            username: user.username,
            firstname: user.firstname ? user.firstname : '',
            lastname: user.lastname ? user.lastname : '',
            email: user.email ? user.email : ''
        }
    }
}
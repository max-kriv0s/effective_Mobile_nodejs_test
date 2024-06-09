import { StatusCodes } from 'http-status-codes';

export class UsersController {
    constructor(usersService, usersQueryRepository) {
        this.usersService = usersService
        this.usersQueryRepository = usersQueryRepository
    }

    async createUser(req, res) {
        try {
            const userResponse = await this.usersService.createUser(req.body)
            const userView = await this.usersQueryRepository.getUserById(userResponse.userId)
            res.send(userView)
        } catch (error) {
            console.error(error)
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async updateUser(req, res) {
        try {
            await this.usersService.updateUser(req.params.id, req.body)
            const userView = await this.usersQueryRepository.getUserById(req.params.id)
            res.send(userView)
        } catch (error) {
            console.error(error)
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async getUsers(req, res) {
        try {
            const userView = await this.usersQueryRepository.getUsers()
            res.send(userView)
        } catch (error) {
            console.error(error)
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}

import { StatusCodes } from 'http-status-codes';

export class UserHistoriesController {
    constructor(userHistoriesService, userHistoriesQueryRepository) {
        this.userHistoriesService = userHistoriesService
        this.userHistoriesQueryRepository = userHistoriesQueryRepository
    }

    async addHistory(req, res) {
        try {
            await this.userHistoriesService.addHistory(req.body)
            res.sendStatus(StatusCodes.CREATED)
        } catch (error) {
            console.error(error)
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async getHistory(req, res) {
        try {
            const usersHistoriesView = await this.userHistoriesQueryRepository.getHistory()
            res.send(usersHistoriesView)
        } catch (error) {
            console.error(error)
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}
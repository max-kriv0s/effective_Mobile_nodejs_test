import { UserHistoryModel } from '../models/userHistory.model.js'

export class UserHistoriesRepository {
    constructor() {
        this.userHistoryModel = UserHistoryModel
    }

    async create(historyDto) {
        return this.userHistoryModel.create(historyDto)
    }
}
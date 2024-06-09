import { UserHistoryModel } from '../models/userHistory.model.js'

export class UserHistoriesQueryRepository {
    constructor() {
        this.userHistoryModel = UserHistoryModel
    }

    async getHistory() {
        const histories = await this.userHistoryModel.findAll()
        return histories.map((history) => this.convertToView(history))
    }

    convertToView(history) {
        return { 
            id: history.userId, 
            ...history.data
        }
    }
}
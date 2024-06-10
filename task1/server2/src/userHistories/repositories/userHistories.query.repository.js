import { UserHistoryModel } from '../models/userHistory.model.js'

export class UserHistoriesQueryRepository {
    constructor() {
        this.userHistoryModel = UserHistoryModel
    }

    async getHistory(queryParams) {
        const userId = queryParams.userId
        const page = queryParams.page ? +queryParams.page : 1
        const size = queryParams.size ? +queryParams.size : 10
        const sortBy = queryParams.sortBy ? queryParams.sortBy : 'updatedAt'
        
        let sortDirection = 'ASC'
        if (queryParams.sortDirection && queryParams.sortDirection === 'DESC') {
            sortDirection = 'DESC'
        }

        const { limit, offset } = this.getPagination(page, size)
        const filter = userId ? { userId } : {}

        const histories = await this.userHistoryModel.findAndCountAll({ 
            where: filter, 
            limit, 
            offset,
            order: [
                [sortBy, sortDirection]
            ]
         })
        return this.getPaginateData(histories, limit, page)
    }

    convertToView(history) {
        return { 
            id: history.userId, 
            ...history.data
        }
    }

    getPagination(page, size) {
        const limit = size ? +size : 10
        const offset = page ? (+page - 1) * size : 0 

        return { limit, offset }
    }

    getPaginateData(data, limit, page = 1) {
        const { count: totalItems, rows: histories } = data
        const currentPage = page
        const totalPages = Math.ceil(totalItems / limit)

        return {
            totalItems,
            currentPage,
            totalPages,
            histories: histories.map((history) => this.convertToView(history)),
        }
    }
}
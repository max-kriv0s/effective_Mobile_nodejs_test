export class UserHistoriesService {
    constructor(userHistoriesRepository) {
        this.userHistoriesRepository = userHistoriesRepository
    }

    async addHistory(historyDto) {
        return this.userHistoriesRepository.create(historyDto)
    }
}
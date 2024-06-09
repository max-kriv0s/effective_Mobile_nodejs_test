import { UserHistoriesController } from "./userHistories/controllers/userHistories.controller.js";
import { UserHistoriesRepository } from "./userHistories/repositories/userHistories.repository.js";
import { UserHistoriesService } from "./userHistories/services/userHistories.service.js";
import { UserHistoriesQueryRepository } from './userHistories/repositories/userHistories.query.repository.js'

const userHistoriesRepository = new UserHistoriesRepository()
const userHistoriesQueryRepository = new UserHistoriesQueryRepository()
const userHistoriesService = new UserHistoriesService(userHistoriesRepository)
export const userHistoriesController = new UserHistoriesController(userHistoriesService, userHistoriesQueryRepository)
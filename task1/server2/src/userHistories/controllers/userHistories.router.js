import { Router } from 'express'
import { userHistoriesController } from '../../composition-root.js'

export const routerUserHistories = Router({})

routerUserHistories.get('/', userHistoriesController.getHistory.bind(userHistoriesController))
routerUserHistories.post('/', userHistoriesController.addHistory.bind(userHistoriesController))
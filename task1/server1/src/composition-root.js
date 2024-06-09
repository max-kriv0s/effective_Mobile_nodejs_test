import { UsersController } from "./users/controllers/users.controller.js";
import { UsersRepository } from "./users/repositories/users.repository.js";
import { UsersService } from "./users/services/users.service.js";
import { UsersQueryRepository } from './users/repositories/users.query.repository.js'

const usersRepository = new UsersRepository()
const usersQueryRepository = new UsersQueryRepository()
const usersService = new UsersService(usersRepository)
export const usersController = new UsersController(usersService, usersQueryRepository)
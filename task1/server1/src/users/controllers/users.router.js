import { Router } from 'express'
import { usersController } from '../../composition-root.js'

export const routerUsers = Router({})

routerUsers.get('/', usersController.getUsers.bind(usersController))
routerUsers.post('/', usersController.createUser.bind(usersController))
routerUsers.patch('/:id', usersController.updateUser.bind(usersController))
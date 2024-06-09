import express from 'express'
import { routerUsers } from './users/controllers/users.router.js'
export const app = express()

app.use(express.json())

app.use('/users', routerUsers)

app.get('/', (req, res) => {
    res.send('OK')
})
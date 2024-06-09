import express from 'express'
import { routerUserHistories } from './userHistories/controllers/userHistories.router.js'
export const app = express()

app.use(express.json())

app.use('/userHistories', routerUserHistories)

app.get('/', (req, res) => {
    res.send('OK')
})

import { app } from './app.js'
import { settings } from './core/settings.js' 
import { connectionDb } from './core/database/dbConnected.js'

const PORT = settings.appSettings.PORT

const startApp = async () => {
    connectionDb()
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
}

startApp()
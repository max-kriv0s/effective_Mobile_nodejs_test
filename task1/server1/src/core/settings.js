import dotenv from 'dotenv'
dotenv.config({ path: ['.env.development.local', '.env.development'] }) 

export const settings = {
    appSettings: {
        PORT: Number.parseInt(process.env.PORT) || 3000,
    },
    
    databaseSettings: {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: Number.parseInt(process.env.DB_PORT),
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
    }
}
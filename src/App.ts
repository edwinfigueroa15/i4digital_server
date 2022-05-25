import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
config({ path: "./.env" })

import sequelize from './config/db'
import * as routes from './routes'

class App {
    private app: Application
    private host: string
    private port: string
    private apiPaths = {}
    
    constructor() {
        this.app = express()
        this.host = process.env.HOST || 'http://localhost'
        this.port = process.env.PORT || '4000'

        // METODOS INICIALES
        this.dbConnection()
        this.middlewares()
        this.routes()
    }

    listen() {
        this.app.listen(this.port, () => console.log(`SERVER RUNNING ON: ${this.host}:${this.port}/`))
    }

    dbConnection(){
        //PROBAR SI ESTA CONECTANDO A LA BASE DE DATOS
        sequelize.authenticate()
            .then(() => console.log('Connection to database has been established successfully'))
            .catch(error => console.log('Unable to connect to the database: '+error))
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // LECTURA DE JSON Y BODY
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        // MORGAN
        this.app.use(morgan('dev'))
    }

    routes() {
        console.log('Routes')
    }
}

export default App
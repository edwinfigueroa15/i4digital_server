import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
config({ path: "./.env" })

import sequelize from './config/db'
import './models'
import routes from './routes'

class App {
    private app: Application
    private host: string
    private port: string
    private apiPaths = {
        record: '/api/record',
    }
    
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

        // MIGRAMOS LOS DATOS DE LOS MODELOS A LA BASE DE DATOS PARA CREAR LAS TABLAS (iMPORTANTE TOCA IMPORTAR LOS MODELOS PRIMERO)
        sequelize.sync()
            .then(() => console.log('Migrations completed'))
            .catch(error => console.log('Failed to migrate database: ', error))
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
        this.app.use(this.apiPaths.record, routes.RecordRoute)
    }
}

export default App
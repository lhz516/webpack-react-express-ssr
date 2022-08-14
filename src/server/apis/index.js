import express from 'express'
import todosRouter from './todos'

const apisRouter = express.Router()

apisRouter.use('/todos', todosRouter)

export default apisRouter

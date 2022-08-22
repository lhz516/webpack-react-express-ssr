import express from 'express'
import todosRouter from './todos'
import pokemonsRouter from './pokemons'

const apisRouter = express.Router()

apisRouter.use('/todos', todosRouter)
apisRouter.use('/pokemons', pokemonsRouter)

export default apisRouter

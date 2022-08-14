import express from 'express'

const todosRouter = express.Router()

todosRouter.get('/', function (req, res) {
  return res.json([{ id: 1, text: 'sample todo' }])
})

export default todosRouter

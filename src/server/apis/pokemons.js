import express from 'express'

const pokemonsRouter = express.Router()

pokemonsRouter.get('/', function (req, res) {
  return res.json({
    text: `sample returned text, total count is ${req.query.count}`,
  })
})

export default pokemonsRouter

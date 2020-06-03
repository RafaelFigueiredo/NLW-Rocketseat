
import express from 'express'
import knex from './database/connection'
import PointsController from './controllers/pointsController'
import ItemsController from './controllers/itemsController'

const router = express.Router()
const pointsController = new PointsController();
const itemsController = new ItemsController();



router.get('/items', itemsController.index)
router.post('/points', pointsController.create)
router.get('/points/:id', pointsController.show)

export default router
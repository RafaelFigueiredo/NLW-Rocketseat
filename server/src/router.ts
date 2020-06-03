
import express from 'express'
import knex from './database/connection'
import PointsController from './controllers/pointsController'
import ItemsController from './controllers/itemsController'

const router = express.Router()
const pointsController = new PointsController();
const itemsController = new ItemsController();



router.get('/items', itemsController.index)

router.get('/points', pointsController.index)
router.get('/points/:id', pointsController.show)
router.post('/points', pointsController.create)

export default router
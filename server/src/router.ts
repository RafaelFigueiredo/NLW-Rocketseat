
import express from 'express'
import knex from './database/connection'
import PointsController from './controllers/pointsController'
import ItemsController from './controllers/itemsController'

const router = express.Router()
const itemsController = new ItemsController();



router.get('/items', itemsController.index)


export default router
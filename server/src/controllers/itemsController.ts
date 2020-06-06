import {Request, Response} from 'express'
import knex from '../database/connection';

const BASE_URL = process.env['BASE_URL']

class ItemsController{
    async index(request: Request, response: Response){
        const items = await knex('items').select('*');

        const serializedItems = items.map(item=>{
            return {
                id: item.id,
                title: item.title,
                image_url: `${BASE_URL}/uploads/${item.image}`
            }
        })
        return response.json(serializedItems)
    }
}


export default ItemsController
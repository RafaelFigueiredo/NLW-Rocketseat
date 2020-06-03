import {Request, Response} from 'express'
import knex from '../database/connection';

class PointsController{
    async show(request: Request, response: Response){
        const {id} = request.params;

        const point = await knex('points').where('id', id).first();
        if(!point){
            return response.status(400).json({message: 'Point not found'})
        }

        const items = await knex('items')
            .join('point-items', 'items.id', '=','point-items.item_id')
            .where('point-items.point_id', id)
            .select('items.title')
        
        return response.json({ point, items})
    }
    async create(request: Request, response: Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        
            const trx = await knex.transaction();
        
    
        const insertedIds = await trx('points').insert({
            name,
            image: 'image-fake',
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        })
    
        const point_id = insertedIds[0]
        const pointItems = items.map((item_id: number)=>{
            return{
                item_id,
                point_id
            }
        })
        await trx('point-items').insert(pointItems)

        //FIXME: Commit or rollback
    
        return response.json({success: true})
    }
}

export default PointsController
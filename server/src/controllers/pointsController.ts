import {Request, Response} from 'express'
import knex from '../database/connection';


const BASE_URL = process.env['BASE_URL']


class PointsController{
    async index(request: Request, response: Response){
        const {city, uf, items} = request.query

        const parsedItems = String(items)
            .split(",")
            .map(item=> Number(item.trim()))
        
        const points = await knex('points')
            .join('point-items', 'points.id', '=', 'point-items.point_id')
            .whereIn('point-items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')

        const serializedPoints = points.map(point => ({
                ...points,
                image: `${BASE_URL}/uploads/${point.image}`
            }));

        return response.json(serializedPoints)

    }

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
         
        const serializedPoint = {
            ...point,
            image: `${BASE_URL}/uploads/${point.image}`
            }

        return response.json({ serializedPoint , items})
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
        
    
        const point = {
            name,
            image: request.file.filename,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }
        const insertedIds = await trx('points').insert(point)
    
        const point_id = insertedIds[0]
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number)=>{
                    return{
                        item_id,
                        point_id
                    }
                });

        await trx('point-items').insert(pointItems)

        trx.commit()
    
        return response.json({
            id: point_id,
            ...point
        })
    }
}

export default PointsController

import express from 'express'
import knex from './database/connection'


const router = express.Router()

router.get('/items', async (request, response)=>{
    const items = await knex('items').select('*');

    const serializedItems = items.map(item=>{
        return {
            title: item.title,
            image_url: `http://localhost:5252/uploads/${item.image}`
        }
    })
    return response.json({
        serializedItems
    })
})

router.post('/points', async(request, response)=>{
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

    return response.json({success: true})
})

export default router
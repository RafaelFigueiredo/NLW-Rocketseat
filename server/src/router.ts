
import express from 'express'


const router = express.Router()



const users = [
    'Rafael',
    'Diego',
    'Cleiton',
    'Robson',
    'Daniel',
]


router.get('/users', (request, response)=>{
    console.log('Listagem de usuários')
    const search = String(request.query.search).toLowerCase()
    const filteredUsers = search ? users.filter(user => user.toLowerCase().includes(search)) : users
    return response.json(filteredUsers)
})

router.post('/users', (request, response)=>{
    const data = request.body
    const user = {
        name:   data.name,
        email:  data.email,
    }
    
    return response.json(user)
})

router.get('/', (request, response)=>{
    response.json({
        status: 'running'
    })
})

export default router
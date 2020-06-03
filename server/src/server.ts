import express from 'express'


const app = express()


const users = [
    'Rafael',
    'Diego',
    'Cleiton',
    'Robson',
    'Daniel',
]

app.get('/users', (request, response)=>{
    console.log('Listagem de usuários')
    const search = String(request.query.search).toLowerCase()
    const filteredUsers = search ? users.filter(user => user.toLowerCase().includes(search)) : users
    return response.json(filteredUsers)
})

app.get('/users/:id', (request, response)=>{
    console.log("Listagem de usuários único")
    const id = Number(request.params.id)
    const user = users[id]
    return response.json(user)
})

app.post('/user', (request, response)=>{
    const {user} = request.body
    users.push(user)
})

const PORT = process.env['PORT'] || 5252
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
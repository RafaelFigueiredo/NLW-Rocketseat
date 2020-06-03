import express from 'express'


const app = express()
app.use(express.json())

const users = [
    'Rafael',
    'Diego',
    'Cleiton',
    'Robson',
    'Daniel',
]

app.get('/', (request, response)=>{
    response.json({
        status: 'running'
    })
})

const PORT = process.env['PORT'] || 5252
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
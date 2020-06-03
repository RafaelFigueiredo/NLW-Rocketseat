import express from 'express'
import routers from './router'

const app = express()

app.use(express.json())
app.use(routers)

const PORT = process.env['PORT'] || 5252
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
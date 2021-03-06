require('dotenv').config()
import express from 'express'
import routers from './router'
import path from 'path'
import cors from 'cors'
import {errors} from 'celebrate'


const app = express()

app.use(cors())

app.use(express.json())
app.use(routers)

app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')));

app.use(errors())

const PORT = process.env['PORT'] || 5252
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
import express from 'express'


const app = express()

app.get('/', (req, res)=>{
    console.log("/")
    res.json({hello:'world'})
})

const PORT = 5252
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
import express from 'express'
import { config } from 'dotenv'

config();

const app = express()
const port = process.env.PORT

app.get('/', (req,res)=>{
    console.log("estamos no get")
    res.send('Hello world')
})



app.listen(port,()=>{
    console.log("servidor de pe")
})
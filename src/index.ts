import express from 'express'
import { config } from 'dotenv'
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users.js';
import { GetUsersController } from './controllers/get-users/get-users.js';

config();

const app = express()
const port = process.env.PORT

app.get('/users', async (req,res)=>{
    console.log("estamos no get")
    const mongoRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoRepository);

    const {body, statusCode} = await getUsersController.handle();

    res.send(body).status(statusCode);

})



app.listen(port,()=>{
    console.log("servidor de pe")
})
import express from 'express'
import { config } from 'dotenv'
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users.js';
import { GetUsersController } from './controllers/get-users/get-users.js';
import { MongoClient } from './database/mongo.js';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user.js';
import { CreateUserController } from './controllers/create-user/create-user.js';



const main = async () => {
  config();

  const app = express();
  app.use(express.json())

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    console.log("estamos no get");
    const mongoRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post('/users', async (req, res) =>{
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(mongoCreateUserRepository);

    const { body, statusCode } = await createUserController.handle({body:req.body});

    res.status(statusCode).send(body)

  })


  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log("servidor de pe");
  });
};

main();
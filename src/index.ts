import express from 'express'
import { config } from 'dotenv'
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users.js';
import { GetUsersController } from './controllers/get-users/get-users.js';
import { MongoClient } from './database/mongo.js';



const main = async () => {
  config();

  const app = express();

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    console.log("estamos no get");
    const mongoRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log("servidor de pe");
  });
};

main();
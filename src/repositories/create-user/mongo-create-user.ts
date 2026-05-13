import type { ObjectId } from "mongodb";
import type { CreateUserParams, ICreateUserRepository } from "../../controllers/create-user/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import type { User } from "../../models/user.js";


type MongoUser = Omit<User, 'id'> & {
  _id: ObjectId;
}

export class MongoCreateUser implements ICreateUserRepository{
    async createUser(params: CreateUserParams): Promise<User>{
       const { insertedId } = await MongoClient.db.collection('users').insertOne(params)

       const user = await MongoClient.db.collection<MongoUser>('users').findOne({ _id: insertedId})

        if(!user) {
        throw new Error("user not created");
        }

        const { _id, ...rest} = user;

        return { id: _id.toHexString(), ...rest}
    }

}
import type { User } from "../../models/user.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";
import type { IUpdateUserController, IUpdateUserRepository, UpdateUserParams } from "./protocols.js";

export class UpdateUserController implements IUpdateUserController{

    constructor( private readonly updateUserRepository: IUpdateUserRepository){}

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try{

            const id = httpRequest?.params?.id;
            const body = httpRequest.body

            if(!id){
                return {
                    statusCode: 500,
                    body: "Missing id"
                }
            }
            
            const allowedFields: (keyof UpdateUserParams)[]  = ["firstName","lastName","password"]
            const fieldsNotAllow = Object.keys(body).some(key => !allowedFields.includes(key as keyof UpdateUserParams))

            if(fieldsNotAllow){
                return {
                    statusCode: 400,
                    body: " Update allowed filds: name, lastname and password"
                }
            }

            const user = await this.updateUserRepository.updateUser(id, body)

            return{
                statusCode:200,
                body: user
            }

        }catch(error){
          return {
            statusCode: 500,
            body: "something went wrong",
          };
        }
    }

}
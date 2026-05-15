import { ifError } from "assert";
import type { IGetUsersController, IGetUsersRepository } from "./protocols.js";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() {

    try {

      const user = await this.getUsersRepository.getUsers();

        return {
            statusCode: 200,
            body: user
        }
    } catch (error) {
      //console.error(error) aqui deu um erro de banco de dados e eu precisei para debugar
        return {
            statusCode: 500,
            body: "something went wrong"
        }
    }
  }
}
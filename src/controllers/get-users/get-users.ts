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
        return {
            statusCode: 500,
            body: "something went wrong"
        }
    }
  }
}
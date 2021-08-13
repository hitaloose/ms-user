import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http';
import { RegisterNewUser } from '../../domain/usecases/register-new-user'

export class RegisterNewUserController implements Controller {
  constructor(
    private readonly registerNewUser: RegisterNewUser
  ) { }

  async run(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, name, password, passwordConfirmation } = request.body

      if (!email) {
        return {
          statusCode: 400
        }
      }

      if (!name) {
        return {
          statusCode: 400
        }
      }

      if (!password) {
        return {
          statusCode: 400
        }
      }

      if (!passwordConfirmation) {
        return {
          statusCode: 400
        }
      }

      const newUser = await this.registerNewUser.run({
        name,
        email,
        password,
        passwordConfirmation
      })

      return {
        statusCode: 200,
        body: newUser
      }
    } catch (err) {
      return {
        statusCode: 500
      }
    }
  }
}
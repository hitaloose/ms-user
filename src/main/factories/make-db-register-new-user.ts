import { DbRegisterNewUser } from "../../data/usecases/db-register-new-user"

import { UserRepository } from '../../infra/repositories/user-repository'
import { BcryptAdapter } from '../../infra/adapters/bcrypt-adapter'
import { EmailAdapter } from '../../infra/adapters/email-adapter'

export const makeDbRegisterNewUser = () => {

  const userRepository = new UserRepository()
  const bcryptAdapter = new BcryptAdapter(12)
  const emailAdapter = new EmailAdapter('https://us-central1-serverless-318412.cloudfunctions.net/mail/')

  return new DbRegisterNewUser(userRepository, bcryptAdapter, userRepository, emailAdapter)
}
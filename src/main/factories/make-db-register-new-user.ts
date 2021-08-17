import { DbRegisterNewUser } from "../../data/usecases/db-register-new-user"

import { UserRepository } from '../../infra/repositories/user-repository'
import { BcryptAdapter } from '../../infra/adapters/bcrypt-adapter'
import { EmailAdapter } from '../../infra/adapters/email-adapter'
import { constants } from "../constants"

export const makeDbRegisterNewUser = () => {
  const topicName = constants.sendEmailTopic

  if(!topicName) {
    throw new Error('SEND_EMAIL_TOPIC not found')
  }

  const emailAdapter = new EmailAdapter(topicName)
  const userRepository = new UserRepository()
  const bcryptAdapter = new BcryptAdapter(12)


  return new DbRegisterNewUser(userRepository, bcryptAdapter, userRepository, emailAdapter)
}
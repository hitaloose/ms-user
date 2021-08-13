import { RegisterNewUser, RegisterNewUserInput, RegisterNewUserOutput } from '../../domain/usecases/register-new-user'
import { SelectUserByEmailRepo } from '../contracts/select-user-by-email-repo'
import { InsertUserRepo } from '../contracts/insert-user-repo'
import { Hasher } from '../contracts/hasher'
import { EmailSender } from '../contracts/email-sender'

export class DbRegisterNewUser implements RegisterNewUser {
  constructor(
    private readonly selectUserByEmail: SelectUserByEmailRepo,
    private readonly hasher: Hasher,
    private readonly insertUserRepo: InsertUserRepo,
    private readonly emailSender: EmailSender
  ) { }

  async run(data: RegisterNewUserInput): Promise<RegisterNewUserOutput> {
    const { email, name, password, passwordConfirmation } = data

    const user = await this.selectUserByEmail.selectByEmail(email)

    if (user) {
      throw new Error()
    }

    if (password !== passwordConfirmation) {
      throw new Error()
    }

    const hashPassword = await this.hasher.hash(password)

    const newUser = await this.insertUserRepo.insert({
      name,
      email,
      hashPassword
    })

    await this.emailSender.send({
      to: {
        name,
        email
      },
      subject: 'Bem vindo',
      content: 'Agora você faz parte da nossa rede'
    })

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  }
}
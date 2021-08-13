import { v4 as uuid } from 'uuid'

import { InsertUserRepo, InsertUserRepoInput } from '../../data/contracts/insert-user-repo'
import { SelectUserByEmailRepo } from '../../data/contracts/select-user-by-email-repo'
import { User } from '../../domain/entities/user'

export class UserRepository implements SelectUserByEmailRepo, InsertUserRepo {
  private static USERS: User[] = []

  async insert(data: InsertUserRepoInput): Promise<User> {
    const newUser: User = {
      id: uuid(),
      name: data.name,
      email: data.email,
      hashPassword: data.hashPassword,
    }

    UserRepository.USERS.push(newUser)

    return newUser
  }

  async selectByEmail(email: string): Promise<User | null> {
    const user = UserRepository.USERS.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
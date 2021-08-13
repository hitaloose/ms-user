import { hash } from 'bcrypt'

import { Hasher } from '../../data/contracts/hasher'

export class BcryptAdapter implements Hasher {
  constructor(
    private readonly salt: number
  ) {}

  async hash(value: string): Promise<string> {
    const hashValue = await hash(value, this.salt)

    return hashValue
  }
}
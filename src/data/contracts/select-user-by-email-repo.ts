import { User } from '../../domain/entities/user'

export interface SelectUserByEmailRepo {
  selectByEmail(email: string): Promise<User | null>
}
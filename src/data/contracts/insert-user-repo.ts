import { User } from '../../domain/entities/user'

export type InsertUserRepoInput = {
  name: string
  email: string
  hashPassword: string
}

export interface InsertUserRepo {
  insert(data: InsertUserRepoInput): Promise<User>
}
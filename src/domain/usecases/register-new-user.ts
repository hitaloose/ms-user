export type RegisterNewUserInput = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export type RegisterNewUserOutput = {
  id: string
  name: string
  email: string
}

export interface RegisterNewUser {
  run(data: RegisterNewUserInput): Promise<RegisterNewUserOutput>
}
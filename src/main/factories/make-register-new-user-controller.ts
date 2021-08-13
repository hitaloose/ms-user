import { RegisterNewUserController } from "../../application/controllers/register-new-user-controller"
import { makeDbRegisterNewUser } from "./make-db-register-new-user"

export const makeRegisterNewUserController = () => {
  return new RegisterNewUserController(makeDbRegisterNewUser())
}
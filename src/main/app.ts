import express from 'express'
import { controllerAdapter } from './adapters/controller-adapter'
import { makeRegisterNewUserController } from './factories/make-register-new-user-controller'

const app = express()

app.use(express.json())

app.post('/register', controllerAdapter(makeRegisterNewUserController()))

export { app }
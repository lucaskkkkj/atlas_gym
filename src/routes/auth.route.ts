import { Router } from 'express'
import { AuthController } from 'src/controllers/auth.controller'
const route = Router()

route.get('/', AuthController.showLogin)

route.post('/staff', AuthController.storeStaff)

route.post('/user', AuthController.storeUser)

route.delete('/logout', AuthController.delete)

/* Undefined Routes */
route.get('/user', (_, res) => res.redirect('/login'))

export { route }

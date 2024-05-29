import { Router } from 'express'
import { TrainerController } from 'src/controllers/trainer.controller'
import { upload } from 'src/middlewares/UploadMiddleware'
const route = Router()

//DASHBOARD
route.get('/:trainerId', TrainerController.showDashboard)

// MOSTRAR CLIENTES REGISTRADOS
route.get('/:trainerId/clients', TrainerController.showAllClients)

// PERFIL DO USUÁRIO
route.get('/:trainerId/client/:userId', TrainerController.showClientProfile)

// ADICIONAR ALUNO
route.post('/:trainerId/client', upload.single('avatar'), TrainerController.addClient)

//ADICIONAR TREINOS
route.post('/:trainerId/client/:userId/workout', TrainerController.addWorkout)

// ADICIONAR MEDIDAS
route.post('/:trainerId/client/:userId/meansurements', TrainerController.addMeansurement)

//ADICIONAR DICAS
route.post('/:trainerId/client/:userId/tip', TrainerController.addTip)

// REMOVER ALUNO CLIENTE
route.delete('/:trainerId/client/:userId', TrainerController.removeClient)

export { route }

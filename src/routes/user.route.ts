import { Router } from 'express'
import { UserController } from 'src/controllers/user.controller'
const route = Router()

/* Mostrar tela inical */
route.get('/:userId', UserController.showDashboard)

/* Mostra o perfil */
route.get('/:userId/profile', UserController.showProfile)

/* Mostra os treinos */
route.get('/:userId/workouts', UserController.allWorkouts)

/* Mostra os exercícios*/
route.get('/:userId/workout/:workoutId', UserController.showWorkout)

route.post('/:userId/password', UserController.changePassword)

export { route }

import { Request, Response } from 'express'
import Exercise from 'src/models/Exercise'
import Measurement from 'src/models/Meansurement'
import Tip from 'src/models/Tip'
import Trainer from 'src/models/Trainers'
import User from 'src/models/User'
import Workout from 'src/models/Workout'
import { sendEmailPassword } from 'src/utils/email'
import { userSchema } from 'src/validator/schemas/user-schema'

export class TrainerController {
	static async showDashboard(request: Request, response: Response) {
		try {
			const error = request.flash('error')
			const { trainerId } = request.params
			const trainer = await Trainer.findOne({ where: { trainer_uuid: trainerId } })
			console.log(trainer)

			const [users, usersCount, workoutsCount, meansurementCount] = await Promise.all([
				User.findAll({ limit: 10, order: [['id', 'DESC']] }),
				User.count(),
				Workout.count(),
				Measurement.count(),
			])

			return response.render(`trainer/trainer_home`, {
				partial: 'trainer/trainer_dashboard',
				users,
				trainer,
				usersCount,
				workoutsCount,
				meansurementCount,
				error,
			})
		} catch (error) {
			console.error(error)
			response.status(500).send('erro interno no servidor')
		}
	}

	static async showAllClients(request: Request, response: Response) {
		try {
			const { trainerId } = request.params

			const trainer = await Trainer.findOne({ where: { trainer_uuid: trainerId } })
			const clients = await User.findAll()
			return response.render(`trainer/trainer_home`, {
				partial: 'trainer/trainer_allClients',
				trainer,
				clients,
			})
		} catch (error) {
			console.error(error)
			response.status(500).send('erro interno no servidor')
		}
	}

	static async showClientProfile(request: Request, response: Response) {
		try {
			const { userId, trainerId } = request.params

			const [user, trainer] = await Promise.all([
				User.findOne({ where: { user_uuid: userId } }),
				Trainer.findOne({ where: { trainer_uuid: trainerId } }),
			])

			const meansurements = await Measurement.findOne({ where: { user_fk: user?.id } })

			return response.render('trainer/trainer_user', {
				user,
				trainer,
				meansurements,
			})
		} catch (error) {
			console.log(error)
		}
	}

	static async addClient(request: Request, response: Response) {
		try {
			const data = request.body
			const fileName = request.file?.filename
			const { trainerId } = request.params

			let { value, error } = userSchema.validate(data)

			const [user, trainer] = await Promise.all([
				User.findOne({ where: { email: data.email } }),
				Trainer.findOne({ where: { trainer_uuid: trainerId } }),
				User.findAll(),
			])

			if (error) {
				request.flash('error', error.message)
				return response.redirect(`/trainer/${trainer?.trainer_uuid}/clients`)
			}

			if (!user) {
				value.photo = fileName
				const user = await User.create(value)
				sendEmailPassword(user.email, user.name, user.password)
				return response.redirect(`/trainer/${trainer?.trainer_uuid}/clients`)
			}

			request.flash('error', 'Um usuário com um desses campos já existe')
			return response.redirect(`/trainer/${trainer?.trainer_uuid}/clients`)
		} catch (error) {
			console.log(error)
		}
	}

	static async removeClient(request: Request, response: Response) {
		try {
			const { trainerId, userId } = request.params
			const trainer = await Trainer.findOne({ where: { trainer_uuid: trainerId } })
			await User.destroy({ where: { user_uuid: userId } })
			return response.redirect(`/trainer/${trainer?.trainer_uuid}/clients`)
		} catch (error) {
			console.log(error)
		}
	}

	static async addWorkout(request: Request, response: Response) {
		const data = request.body
		const { userId, trainerId } = request.params

		try {
			const [user, trainer] = await Promise.all([
				User.findOne({ where: { user_uuid: userId } }),
				Trainer.findOne({ where: { trainer_uuid: trainerId } }),
			])

			if (!user) {
				request.flash('error', 'User not found')
				return response.redirect(`/trainer/${trainer?.trainer_uuid}/client/${userId}`)
			}

			if (Object.values(data).some(value => value === '')) {
				request.flash('error', 'Preencha todos os campos')
				return response.redirect(
					`/trainer/${trainer?.trainer_uuid}/client/${user?.user_uuid}`,
				)
			}

			let workout = await Workout.findOne({
				where: {
					type_workout: data.typeWorkout,
					user_fk: user.id,
				},
			})

			if (!workout) {
				workout = await Workout.create({
					type_workout: data.typeWorkout,
					user_fk: user.id,
				})
			}

			let exercise = await Exercise.findOne({
				where: {
					exercise: data.exercise,
					workout_fk: workout.id,
				},
			})

			if (exercise) {
				await exercise.update({
					name: data.name,
					sets: data.sets,
					reps: data.reps,
					kg: data.kg,
					rest: data.rest,
				})
			} else {
				exercise = await Exercise.create({
					workout_fk: workout.id,
					exercise: data.exercise,
					name: data.name,
					sets: data.sets,
					reps: data.reps,
					kg: data.kg,
					rest: data.rest,
				})
			}

			request.flash('message', 'Treino criado')
			return response.redirect(
				`/trainer/${trainer?.trainer_uuid}/client/${user?.user_uuid}`,
			)
		} catch (error) {
			console.error(error)
			response.status(500).send('An error occurred')
		}
	}

	static async addMeansurement(request: Request, response: Response) {
		const { userId, trainerId } = request.params
		const { weight, height, rightBiceps, leftBiceps, waist, rightThigh, leftThigh } =
			request.body

		try {
			const [user, trainer] = await Promise.all([
				User.findOne({ where: { user_uuid: userId } }),
				Trainer.findOne({ where: { trainer_uuid: trainerId } }),
			])

			if (Object.values(request.body).some(value => value === '')) {
				request.flash('error', 'Preencha todos os campos')
				return response.redirect(
					`/trainer/${trainer?.trainer_uuid}/client/${user?.user_uuid}`,
				)
			}

			let measurement = await Measurement.findOne({ where: { user_fk: user?.id } })

			if (measurement) {
				await Measurement.update(
					{ weight, height, rightBiceps, leftBiceps, waist, rightThigh, leftThigh },
					{ where: { user_fk: user?.id } },
				)
			} else {
				await Measurement.create({
					user_fk: user?.id,
					weight,
					height,
					rightBiceps,
					leftBiceps,
					waist,
					rightThigh,
					leftThigh,
				})
			}
			request.flash('message', 'Medida inserida com sucesso')
			return response.redirect(`/trainer/${trainer?.trainer_uuid}/client/${userId}`)
		} catch (error) {
			console.error(error)
			return response.status(500).send('erro interno no servidor')
		}
	}

	static async addTip(request: Request, response: Response) {
		const { userId, trainerId } = request.params
		const { tip } = request.body

		try {
			console.log(tip)

			const [user, trainer] = await Promise.all([
				User.findOne({ where: { user_uuid: userId } }),
				Trainer.findOne({ where: { trainer_uuid: trainerId } }),
			])

			if (!tip) {
				request.flash('error', 'Preencha o campo de dica')
				return response.redirect(
					`/trainer/${trainer?.trainer_uuid}/client/${user?.user_uuid}`,
				)
			}

			await Tip.create({
				user_fk: user?.id,
				tip,
			})

			request.flash('message', 'Dica inserida com sucesso')
			return response.redirect(`/trainer/${trainer?.trainer_uuid}/client/${userId}`)
		} catch (error) {
			console.error(error)
			return response.status(500).send('Erro interno no servidor')
		}
	}
}

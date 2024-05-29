import { hash } from 'bcrypt'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Request, Response } from 'express'
import Exercise from 'src/models/Exercise'
import Measurement from 'src/models/Meansurement'
import Tip from 'src/models/Tip'
import User from 'src/models/User'
import Workout from 'src/models/Workout'

export class UserController {
	static async showDashboard(request: Request, response: Response) {
		try {
			const { userId } = request.params

			const user = await User.findOne({ where: { user_uuid: userId } })

			const workoutsCount = await Workout.count({ where: { user_fk: user?.id } })
			const meansurement = await Measurement.findOne({ where: { user_fk: user?.id } })
			const lastMeansurement = format(new Date(meansurement?.createdAt!), 'dd/MM/yyyy', {
				locale: ptBR,
			})

			response.render('user/user_home', {
				partial: 'user/user-dashboard',
				user,
				workoutsCount,
				lastMeansurement,
			})
		} catch (error) {
			console.log(error)
		}
	}

	static async allWorkouts(request: Request, response: Response) {
		try {
			const { userId } = request.params

			const user = await User.findOne({
				where: { user_uuid: userId },
			})

			if (!user) {
				return response.status(404).send('Usuário não encontrado')
			}

			const workout = await Workout.findAll({
				where: { user_fk: user.id },
				raw: true,
			})

			response.render('user/user_home', {
				partial: 'user/user-workouts',
				user,
				workout,
			})
		} catch (error) {
			console.error('Erro ao buscar treinos:', error)
			response.status(500).send('Erro ao buscar treinos')
		}
	}

	static async showWorkout(request: Request, response: Response) {
		try {
			const { userId, workoutId } = request.params

			const user = await User.findOne({ where: { user_uuid: userId } })

			const workout = await Workout.findOne({
				where: { id: workoutId, user_fk: user?.id },
			})

			const exercises = await Exercise.findAll({
				where: { workout_fk: workoutId },
				raw: true,
			})

			response.render('user/user_workout', { user, workout, exercises })
		} catch (error) {
			console.error('Erro ao buscar treinos:', error)
			response.status(500).send('Erro ao buscar treinos')
		}
	}

	static async showProfile(request: Request, response: Response) {
		try {
			const { userId } = request.params

			const user = await User.findOne({ where: { user_uuid: userId } })
			const meansurement = await Measurement.findOne({ where: { user_fk: user?.id } })
			const tips = await Tip.findAll({ where: { user_fk: user?.id } })

			return response.render('user/user_home', {
				partial: 'user/user_profile',
				user,
				meansurement,
				tips,
			})
		} catch (error) {
			console.error('Erro ao buscar treinos:', error)
			response.status(500).send('Erro ao buscar treinos')
		}
	}

	static async changePassword(request: Request, response: Response) {
		const data = request.body
		const { userId } = request.params

		try {
			const user = await User.findOne({ where: { user_uuid: userId } })

			if (Object.values(data).some(value => value === '')) {
				request.flash('error', 'Preencha todos os campos')
				return response.redirect(`/user/${user?.user_uuid}/profile`)
			}

			if (data.oldpass !== user?.password) {
				request.flash('error', 'senha inválida')
				return response.redirect(`/user/${user?.user_uuid}/profile`)
			}

			const hashpass = await hash(data.newpass, 10)

			await User.update(
				{ password: hashpass },
				{
					where: {
						user_uuid: userId,
					},
				},
			)

			request.flash('sucess', 'Senha alterada com sucesso')
			return response.redirect(`/user/${user?.user_uuid}/profile`)
		} catch (erro) {
			console.log(erro)
		}
	}
}

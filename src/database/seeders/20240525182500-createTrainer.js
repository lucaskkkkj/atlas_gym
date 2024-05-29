'use strict'
const { hash } = require('bcrypt')
const ShortUniqueId = require('short-unique-id')

const { randomUUID } = new ShortUniqueId({ length: 10 })

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const passwordHash = await hash('senhaSegura', 10)
		await queryInterface.bulkInsert('trainers', [
			{
				trainer_uuid: randomUUID(),
				name: 'Lucas',
				email: 'lucasdepauloldp1@gmail.com',
				password: passwordHash,
			},
			{
				trainer_uuid: randomUUID(),
				name: 'Maria',
				email: 'maria@exemplo.com',
				password: passwordHash,
			},
			{
				trainer_uuid: randomUUID(),
				name: 'João',
				email: 'joao@exemplo.com',
				password: passwordHash,
			},
			{
				trainer_uuid: randomUUID(),
				name: 'Ana',
				email: 'ana@exemplo.com',
				password: passwordHash,
			},
			{
				trainer_uuid: randomUUID(),
				name: 'Pedro',
				email: 'pedro@exemplo.com',
				password: passwordHash,
			},
			{
				trainer_uuid: randomUUID(),
				name: 'Sara',
				email: 'sara@exemplo.com',
				password: passwordHash,
			},
			{
				trainer_uuid: randomUUID(),
				name: 'Carlos',
				email: 'carlos@exemplo.com',
				password: passwordHash,
			},
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('trainers', null, {})
	},
}

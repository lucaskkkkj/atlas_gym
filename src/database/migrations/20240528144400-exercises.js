'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('exercises', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			workout_fk: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'workouts',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			exercise: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			sets: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			reps: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			kg: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			rest: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('exercises')
	},
}

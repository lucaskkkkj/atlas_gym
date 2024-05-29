'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('trainers', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			trainer_uuid: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('staffs')
	},
}

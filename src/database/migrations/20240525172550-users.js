'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			user_uuid: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
			},
			photo: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			sex: {
				type: Sequelize.ENUM('Masculino', 'Feminino'),
				allowNull: false,
			},
			age: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
			},
			phone: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			focus: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('users')
	},
}

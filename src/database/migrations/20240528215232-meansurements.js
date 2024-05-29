'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('meansurements', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_fk: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			weight: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			height: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			right_biceps: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			left_biceps: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			waist: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			right_thigh: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			left_thigh: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('measurements')
	},
}

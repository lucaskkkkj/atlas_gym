import { Sequelize } from 'sequelize-typescript'
import { modelsPath } from 'src/utils/path'

const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	models: [modelsPath],
	logging: false,
	query: {
		raw: true,
	},
	define: {
		timestamps: false,
	},
})

async function connectDatabase() {
	sequelize
		.authenticate()
		.then(() => {
			console.log('Database is connect')
		})
		.catch(error => console.error('Erro to connect database:' + error))
}
export { sequelize, connectDatabase }

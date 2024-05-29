import { hash } from 'bcrypt'
import { BeforeCreate, Column, DataType, Model, Table } from 'sequelize-typescript'
import ShortUniqueId from 'short-unique-id'

const { randomUUID } = new ShortUniqueId({ length: 10 })

@Table({
	tableName: 'trainers',
})
export default class Trainer extends Model {
	@Column({
		type: DataType.STRING(255),
		allowNull: false,
		unique: true,
		defaultValue: randomUUID(),
	})
	declare trainer_uuid: string

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
	})
	declare name: string

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
		unique: true,
	})
	declare email: string


	@Column({
		type: DataType.STRING(255),
		allowNull: false,
		field: 'password',
	})
	declare password: string
}

import { hash } from 'bcrypt'
import {
	BeforeCreate,
	Column,
	DataType,
	HasMany,
	HasOne,
	Model,
	Table,
} from 'sequelize-typescript'
import ShortUniqueId from 'short-unique-id'
import Tip from './Tip'
import Workout from './Workout'

const { randomUUID } = new ShortUniqueId({ length: 10 })

@Table({
	tableName: 'users',
})
export default class User extends Model {
	@Column({
		type: DataType.STRING(255),
		allowNull: false,
		unique: true,
		defaultValue: randomUUID(),
	})
	declare user_uuid: string

	@Column({
		type: DataType.STRING(255),
		allowNull: true,
	})
	declare photo: string | null

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
	})
	declare name: string

	@Column({
		type: DataType.ENUM('male', 'female'),
		allowNull: false,
	})
	declare sex: 'male' | 'female'

	@Column({
		type: DataType.INTEGER(),
		allowNull: false,
	})
	declare age: number

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
	})
	declare email: string

	@Column({
		type: DataType.STRING(255),
		allowNull: true,
	})
	declare phone: string | null

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
		defaultValue: randomUUID(),
	})
	declare password: string

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
	})
	declare focus: string

	@HasOne(() => Tip)
	declare tips: Tip[]

	@HasMany(() => Workout)
	declare workouts: Workout[]
}

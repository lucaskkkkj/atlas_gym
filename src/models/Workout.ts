import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'

import User from './User'

@Table({
	tableName: 'workouts',
	timestamps: false,
})
export default class Workout extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	declare id: number

	@Column({
		type: DataType.ENUM('A', 'B', 'C', 'D', 'E'),
		allowNull: false,
	})
	declare type_workout: 'A' | 'B' | 'C' | 'D' | 'E'

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare user_fk: number

	@Column({
		type: DataType.DATE,
	})
	declare createdAt: Date

	@BelongsTo(() => User)
	declare user: User
}

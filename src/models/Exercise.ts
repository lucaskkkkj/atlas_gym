import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import Workout from './Workout' // Certifique-se de que você tenha um modelo Workout definido

@Table({
	tableName: 'exercises',
})
export default class Exercise extends Model {
	@ForeignKey(() => Workout)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare workout_fk: number

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare exercise: 1 | 2 | 3 | 4 | 5

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare name: string

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare sets: number

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare reps: number

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare kg: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare rest: string

	@BelongsTo(() => Workout)
	declare workout: Workout
}

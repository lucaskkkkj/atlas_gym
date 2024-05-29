import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
	UpdatedAt,
} from 'sequelize-typescript'
import User from './User'

@Table({
	tableName: 'tips',
	updatedAt: true,
	createdAt: false
})
export default class Tip extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	declare id: number

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare user_fk: number

	@Column({
		type: DataType.TEXT,
		allowNull: true,
	})
	declare tip: string

	@UpdatedAt
	@Column({
		allowNull: false,
		type: DataType.DATE,
		defaultValue: DataType.NOW,
	})
	declare updatedAt: Date

	@BelongsTo(() => User)
	declare user: User
}

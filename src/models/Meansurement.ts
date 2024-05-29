import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import User from './User' // Importe o modelo do usuário, se aplicável

@Table({
	tableName: 'meansurements',
})
class Measurement extends Model {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	declare id: number

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	declare user_fk: number

	@BelongsTo(() => User)
	declare user: User

	@Column({ type: DataType.FLOAT, allowNull: false })
	declare weight: number

	@Column({ type: DataType.FLOAT, allowNull: false })
	declare height: number

	@Column({ type: DataType.FLOAT, allowNull: false, field: 'right_biceps' })
	declare rightBiceps: number

	@Column({ type: DataType.FLOAT, allowNull: false, field: 'left_biceps' })
	declare leftBiceps: number

	@Column({ type: DataType.FLOAT, allowNull: false })
	declare waist: number

	@Column({ type: DataType.FLOAT, allowNull: false, field: 'right_thigh' })
	declare rightThigh: number

	@Column({ type: DataType.FLOAT, allowNull: false, field: 'left_thigh' })
	declare leftThigh: number

	@Column({ type: DataType.DATE, defaultValue: DataType.NOW })
	declare createdAt: Date
}

export default Measurement

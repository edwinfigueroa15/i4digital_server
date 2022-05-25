import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/db'

export interface IRecord {
    id: string;
    date: Date;
    method: string;
    returned_data: string;
}

class Record extends Model<IRecord> implements IRecord {
    declare id: string;
    declare date: Date;
    declare method: string;
    declare returned_data: string;
    declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

Record.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    method: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    returned_data: {
        type: DataTypes.TEXT,
        allowNull: false
    }}, {
		tableName: "records",
        timestamps: true,
		sequelize
	}
)

export default Record;
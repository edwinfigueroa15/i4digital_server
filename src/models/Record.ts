import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/db'
import Petition from './Petition';

export interface IRecord {
    id?: string;
    id_petition: string;
    returned_data: string;
}

class Record extends Model<IRecord> implements IRecord {
    declare id: string;
    declare id_petition: string;
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
    id_petition: {
        type: DataTypes.UUID,
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

Petition.hasOne(Record, { foreignKey: 'id_petition', onDelete: 'cascade' })
Record.belongsTo(Petition, { foreignKey: 'id_petition', onDelete: 'cascade' })

export default Record;
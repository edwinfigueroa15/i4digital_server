import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/db'

export interface IPetition {
    id?: string;
    date: Date;
    method: string;
    url: string;
}

class Petition extends Model<IPetition> implements IPetition {
    declare id: string;
    declare date: Date;
    declare method: string;
    declare url: string;
}

Petition.init({
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
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    }}, {
		tableName: "petitions",
        timestamps: false,
		sequelize
	}
)

export default Petition;
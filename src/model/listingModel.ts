import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config'

interface ListingAttributes {
    id: string;
    description: string;
    image: string;
    address: string;
    price: number;
    numOfBeds: number;
    numOfBaths: number;
    rating: number;
    userId: string;
}

export class ListingInstance extends Model<ListingAttributes>{ }

ListingInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    numOfBeds: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    numOfBaths: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    rating: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING
    }
}, {
    sequelize: db,
    tableName: 'listings'
})
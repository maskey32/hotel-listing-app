import { DataTypes, ForeignKeyConstraintError, Model } from 'sequelize';
import db from '../config/database.config'
import { ListingInstance } from './listingModel';

interface UserAttributes {
    id: string;
    fullname: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export class UserInstance extends Model<UserAttributes>{ }

UserInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Name is required'
            },
            notEmpty: {
                msg: 'please enter name'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email is required'
            },
            isEmail: {
                msg: 'Enter a valid email'
            },
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Phone number is required'
            },
            notEmpty: {
                msg: 'Enter a phone number'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'password is required'
            },
            notEmpty: {
                msg: 'Please provide a password'
            }
        }
    }
}, {
    sequelize: db,
    tableName: 'user'
})

//Establishing the one to many relationship
UserInstance.hasMany(ListingInstance, { foreignKey: 'userId', as: 'listings' });
ListingInstance.belongsTo(UserInstance, { foreignKey: 'userId', as: 'user' });


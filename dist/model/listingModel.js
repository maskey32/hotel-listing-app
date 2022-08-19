"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class ListingInstance extends sequelize_1.Model {
}
exports.ListingInstance = ListingInstance;
ListingInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    numOfBeds: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    numOfBaths: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    rating: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'listings'
});
//# sourceMappingURL=listingModel.js.map
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

const Restaurant = sequelize.define('restaurant', {

    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'disable'),
        allowNull: false,
        defaultValue: 'active'
    }
});

export default Restaurant;
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

const Meals = sequelize.define('meals', {

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
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        field: 'restaurant_id'
    },
    status: {
        type: DataTypes.ENUM('active', 'disable'),
        allowNull: false,
        defaultValue: 'active'
    }
    
});

export default Meals;
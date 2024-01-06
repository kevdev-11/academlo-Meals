import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

const Orders = sequelize.define('orders', {

    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    mealId: {
        type: DataTypes.INTEGER,
        field: 'meal_id'
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id'
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'total_price'
    },
    quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'cancelled', 'completed'),
        allowNull: false,
        defaultValue: 'active'
    }

});

export default Orders;
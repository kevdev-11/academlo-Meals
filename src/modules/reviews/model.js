import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

const Reviews = sequelize.define('reviews', {

    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id'
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        field: 'restaurant_id'
    },
    rating: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('perform', 'deleted'),
        allowNull: false,
        defaultValue: 'perform'
    }
});

export default Reviews;
import { sequelize } from "../../config/database/database.js";
import { DataTypes } from "sequelize";

export const Errors = sequelize.define('errors', {
    
    id:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
        },
    status:{
        type: DataTypes.STRING(10),
        allowNull: true
        },
    message:{ 
        type: DataTypes.TEXT,
        allowNull: true
        },
    stack:{
        type: DataTypes.TEXT,
        allowNull: true
        }
});
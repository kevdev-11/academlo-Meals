import { sequelize } from '../../config/database/database.js';
import { DataTypes } from 'sequelize';
import { encrypted } from '../../config/plugins/encrypted-password.js';

 const Users = sequelize.define('users', {
  
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('available', 'disable'),
    allowNull: false,
    defaultValue: 'available',
  },

  role: {
    type: DataTypes.ENUM('admin','normal'),
    defaultValue:'normal',
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async(user) => {
      user.password = await encrypted(user.password)
    }
  }
});

export default Users;
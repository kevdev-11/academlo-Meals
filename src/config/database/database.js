import { Sequelize } from "sequelize";
import { envs } from '../enviroments/enviroments.js'


export const sequelize = new Sequelize(envs.DB, {
    logging: false,
});

export const authenticate = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection in database has been sucessfully auth')
    } catch (error) {
        console.error(error)
    }
}

export const syncUp = async () => {
    try {
        await sequelize.sync()
        console.log('the database sync up correctly')
    } catch (error) {
        console.error(error)
    }
}

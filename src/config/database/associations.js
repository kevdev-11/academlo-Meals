import Meals from "../../modules/meals/model.js"
import Orders from "../../modules/orders/model.js"
import Restaurant from "../../modules/restaurants/model.js"
import Reviews from "../../modules/reviews/model.js"
import Users from "../../modules/users/model.js"

export const initModel = () => {
    
    Users.hasMany(Orders, {foreignKey: 'user_id'})
    Orders.belongsTo(Users)

    Users.hasMany(Reviews, {foreignKey: 'user_id'})
    Reviews.belongsTo(Users)

    Meals.hasOne(Orders)
    Orders.belongsTo(Meals)

    Restaurant.hasMany(Meals)
    Meals.belongsTo(Restaurant)

    Restaurant.hasMany(Reviews)
    Reviews.belongsTo(Restaurant)
    
};

import Meals from "../meals/model.js";
import Orders from "../orders/model.js";
import Users from "./model.js";

export class UserServices {

    static async create(data){
        return await Users.create(data)
    }

    static async findOneUser(id){
        return await Users.findOne({
            where:{
                id: id,
                status: 'available'
            }
        })
    }
    static async findOneByEmail(email){
        return await Users.findOne({
            where: {
                email: email,
                status: 'available'
            }
        })
    }
    static async updateUser(user, data){

        return await user.update(data)
    }

    static async disableUser(user){
        return await Users.update({
            status:'disable'
        },
        {
            where: {
            id: user.id
        }
        })
    }

    static async ordersAll(){ //orders
        
        return await Users.findAll({
            where:{
                userId: userId
            },
            include: [
                {
                    model: Orders,
                    where: {
                        status: 'active'
                    },
                    include:[
                        {
                            model: Meals,
                            where:{
                                id: mealId,
                            }
                        }
                    ]
                }
            ]
        })

        //     where: {
        //         userId: userId
        //     },
        //     include: [
        //         {
        //             model: orders,
        //             where: {
        //                 status:'available'
        //             },
        //             required: false,
        //             include: [
        //                 {
        //                     model:restaurant,
        //                     where:{

        //                     },
        //                     include: [{model: reviews, attributes:['name', 'restaurantId']}]
        //                 }
        //             ]
        //         }
        //     ]
        // })
    }

    static async orderByUser(id){ //orders/:id
        return await Orders.findOne({
            where:{
                userId: id,
                status: 'active'
            }
    })
    }
};
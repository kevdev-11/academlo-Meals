import Users from "../users/model.js"
import Orders from "./model.js"

class OrderServices {

    static async createTo(data) {
        return await Orders.create(data)
    }

    static async findOneOrder(id) {
        return await Orders.findOne({
            where:{
                id: id,
                status: 'active'
            }
        })
    }

    static async findAll() {
        return await Orders.findAll({
            where: {
                userId: userId
            },
            include: [
                {
                    model: Users,
                    // where: {
                    //     id: userId
                    // }
                }
            ]
        })
    }

    static async completedOrder(order) {
        return await Orders.update({
            status:'completed'
        },
        {
            where: {
                id: order.id
            }
        })
    }

    static async cancelledOrder(order) {
        return await Orders.update({
            status:'cancelled'
        },
        {
            where: {
                id: order.id
            }
        })
    }
   
   
}

export default OrderServices;
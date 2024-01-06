import Reviews from "../reviews/model.js"
import Restaurant from "./model.js"


class RestaurantServices {

    static async createNewResto(data) {
        return await Restaurant.create(data)
    };

    static async allRestos (){
        return await Restaurant.findAll({
            where: {
                status: 'active'
            },
            include:[
                {
                    model: Reviews
                }
            ]
        })
    };

    static async oneResto (id){
        return await Restaurant.findOne({
            where: {
                id: id,
                status: 'active'
            },
            include: [
                {
                    model: Reviews
                }
            ]
        })
    };

    static async updateData(resto, data )  {
        return await resto.update(data)
        }

    static async disableData(restaurant){
        return await Restaurant.update({
            status: 'disable'
        },
        {
            where: {
                id: restaurant.id
            }
        }
        )
    }
}

export default RestaurantServices;
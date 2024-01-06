import Meals from "./model.js";

class MealsServices {

    static async createMeal(data){
        return await Meals.create(data)
    };

    static async allMeal(){
        return await Meals.findAll({
            where: {
                status:'active'
            }
        })
    };

    static async oneMeal(id){
        return await Meals.findOne({
            where: {
                id: id,
                status:'active'
            }
        })
    };
    
    static async update(data){
        return await Meals.update(data, {
            where: {
                name: id.name, // ojo
                price: id.price
            }
        })
    };
    static async delete(data){
        return await Meals.update(data, {
            where: {
                status: 'disable' // ojo
            }
        })
    }
}

export default MealsServices;
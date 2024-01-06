import Reviews from "./model.js"


class ReviewServices {

    static async createdReview(data) {
        return await Reviews.create(data)
    };

    static async findOneReview(id) {
        return await Reviews.findOne({
            where: {
                id: id,
                status: 'perform'
            }
        })
    };

    static async updateData(review, data)  {
        return await review.update(data)
    };

    static async disableData(data)  {
        return await Reviews.update(data, {
            where:{
                status: 'deleted'
            }
        })
    }
}

export default ReviewServices;
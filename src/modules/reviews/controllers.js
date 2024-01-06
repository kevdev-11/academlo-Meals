import { catchAsync } from "../../common/errors/catchAsync.js"
import ReviewServices from "./services.js";

export const newReview = catchAsync(async (req, res, next) => {
    
    const { id } = req.params;
    const { comment, rating } = req.body;
    const { sessionUser } = req;

    const review = await ReviewServices.createdReview({
        userId: sessionUser.id,
        restaurantId: id,
        comment,
        rating
    });

    return res.status(200).json({
        review
    });
})
export const updateReview = catchAsync(async (req, res, next) => {

    const {review} = req;
    const { sessionUser } = req;

    const { comment, rating } = req.body;

    const reviewUpdated = await ReviewServices.updateData(review, {
        comment,
        rating
    });

    return res.status(201).json({
        message: 'updated review is OK',
        sessionUser,
        reviewUpdated
    });
});

export const deleteReview = catchAsync(async (req, res, next) => {
    
    const {review} = req;

    const deleted = await ReviewServices.disableData(review);

    return res.json(deleted)
    
})
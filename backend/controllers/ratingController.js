import RatingModel from "../models/ratingModel.js";

const getAverageRating = async (req, res) => {
    try {
        const { itemId } = req.body;
        const ratings = await RatingModel.find({ itemId });
        if (ratings.length === 0) {
            return res.json({
              success: true,
              data: { averageRating: 0 },
            });
          }
        const averageRating = ratings.reduce((acc, rating) => acc + rating.value, 0) / ratings.length;
        res.json({
            success: true,
            data: {averageRating},
        })
    } catch (error) {
        console.error('Error fetching average rating:', error);
        res.json({
            success: false,
            message: 'Internal server error',
    });
    }
}

const updateRating = async (req, res) => {
    try {
        const { itemId, rating } = req.body;
        await RatingModel.create({ itemId, value: rating });
        res.json({
            success: true,
            message: 'Rating updated successfully',
        })
    } catch (error) {
        console.error('Error updating rating:', error);
        res.json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export { getAverageRating, updateRating };
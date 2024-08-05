import express from 'express';
import { getAverageRating, updateRating} from '../controllers/ratingController.js';

const ratingRouter = express.Router();

ratingRouter.post('/getAverageRating', getAverageRating);
ratingRouter.post('/updateRating', updateRating);

export default ratingRouter;
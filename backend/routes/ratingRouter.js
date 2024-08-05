import express from 'express';
import { getAverageRating, updateRating} from '../controllers/ratingController.js';
import authMiddleware from '../middleware/auth.js';

const ratingRouter = express.Router();

ratingRouter.post('/getAverageRating', getAverageRating);
ratingRouter.post('/updateRating', authMiddleware, updateRating);

export default ratingRouter;
import express from "express";
import { addFood } from "../controllers/foodController.js";
import multer from "multer";

let foodRouter = express.Router();


//image storage engine

let storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,callback)=>{
        return callback(null, `${Date.now()}${file.originalname}`)
    }
})

let upload = multer({storage:storage});

foodRouter.post('/add',upload.single('image'), addFood);

export default foodRouter;
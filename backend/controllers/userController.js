import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { response } from "express";

//login
let loginUser = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });

        if(!user){
            return res.json({
                success: false,
                message: "User not found"
            })
        };

        let isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({
                success: false,
                message: "Invalid credentials"
            })
        };

        let token = createToken(user._id);
        res.json({ success: true, token });
        console.log("User logged in successfully");
    } catch (error) {
        console.log(error, res.json({ success: false, message: "Internal Server Error"}));
    }
};

let createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register
let registerUser = async (req, res) => {
    let { name, password, email} = req.body;
    try {
        //existing user check
        let exists = await userModel.findOne({ email })
        if(exists){
            return res.json({ 
                success: false, 
                message:"User already exists"
            });

        }

        //email format validation and strong password check
        if(!validator.isEmail(email)){
            return res.json({
                success: false, 
                message:"Please enter a valid email"
            })
        }

        if(password.length < 8){
            return res.json({
                success: false,
                message: "Password should be atleast 8 characters long"
            })
        }

        // password hashing
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        let newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        let user = await newUser.save();
        let token = createToken(user._id);
        res.status(200).json({ success: true, token });

        console.log("User registered successfully");

    } catch (error) {
        console.log(error);
        res.json({ success:false, message: "Internal Server Error" })
    }
};

export { loginUser, registerUser };
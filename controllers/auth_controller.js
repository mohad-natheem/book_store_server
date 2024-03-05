const userModel = require('../models/user_model')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const JWT_KEY="fc6afdf716dd426e6b1e5781924b54b4"
const createUser = async(req,res) => {
    try{
        const{user_name,phone_number,current_otp,is_admin} = req.body
        if(!(user_name,phone_number)){
            return res.status(400).json({
                'message' : 'User fields required'
            })
        }
        const oldUser = await userModel.findOne({ phone_number });
        if(oldUser){
            return res.status(409).json({
                message : "User already exists",
                res: null
            })
        }
    

        const user = await userModel.create({
            user_name,
            phone_number,
            current_otp,
            is_admin
        });
        const token = jwt.sign({
            id: user._id,
            phone_number
        },process.env.JWT_KEY);
        user.token = token;
        user.save()
        .then(savedDocument => {
            console.log('Document saved:', savedDocument);
          })
          .catch(error => {
            console.error('Error saving document:', error);
          })
        ;
        return res.status(200).json({
            message:"Account created",
            res:user
        })
    }catch(error){
        console.log(error);
    }
}
const loginUser = async (req, res) => {
    try {
        const { user_name, phone_number } = req.body
        console.log(`${user_name} ${phone_number}`)
        if (!(user_name && phone_number)) {
            return res.status(400).json({
                message: "All fields are required",
                res: null
            })
        }
        const user = await userModel.findOne({ phone_number });
        if (user == null) {
            return res.status(409).json({
                message: "User does not exists",
                res: null
            })
        }
    
        if (user) {
            const token = jwt.sign({
                id: user._id,
                phone_number
            },process.env.JWT_KEY)
            user.token = token;
            user.save();
            req.user_id = user.user_id;
            return res.status(200).json({
                message: "User logged in",
                res: {
                    id: user.user_id,
                    token: user.token
                }
            });
        }
        res.status(400).json({
            message: "Invalid credentials",
            res: null
        })
    } catch (err) {
        console.log(err);
    }
}
const logout = async (req,res) =>{
    try{
        

    }catch(err){
        console.log(err);
    }
}
module.exports = {
    createUser,
    loginUser
}
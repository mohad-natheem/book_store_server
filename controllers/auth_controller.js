const userModel = require('../models/user_model')

const createUser = async(req,res) => {
    try{
        const{user_name,phone_number,current_otp,is_admin} = req.body
        if(!(user_name,phone_number)){
            return res.status(400).json({
                'message' : 'User fields required'
            })
        }

        const user = await userModel.create({
            user_name,
            phone_number,
            current_otp,
            is_admin
        });
        user.save();

        return res.status(200).json({
            message:"user saved",
            res:user
        })
    }catch(error){
        console.log(error);
    }
}
const getUser = async(req,res) => {
    try{
        const user = await userModel.find({});

        return res.status(200).json({
            message:"sucess",
            res:user
        })
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    createUser,
    getUser
}
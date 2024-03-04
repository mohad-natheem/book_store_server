const userModel = require('../models/user_model');

const getUsers = async(req,res) => {
    try{
        const users = await userModel.find({});

        return res.status(200).json({
            message:"sucess",
            res:users
        })
    }catch(error){
        console.log(error);
    }
}

const getUser = async(req,res) =>{
    try{
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                message:"All fields are required",
                res:null
            })
        }
        const user = await userModel.findOne({user_id:id});
        if(!user){
            return res.status(409).json({
                message : "User not found",
                res:null
            });
        }
        return res.status(200).json({
            message:"User retrieved successfully",
            res:user
        });

    }catch(error){
        console.log(error);
    }
}

module.exports ={
    getUsers,
    getUser
}

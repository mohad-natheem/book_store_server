const userModel = require('../models/user_model')
const jwt = require('jsonwebtoken')
const createUser = async(req,res) => {
    try{
        const{user_name,email} = req.body
        if(!(user_name,email)){
            return res.status(400).json({
                'message' : 'User fields required'
            })
        }
        const oldUser = await userModel.findOne({ email });
        if(oldUser){
            return res.status(409).json({
                message : "User already exists",
                res: null
            })
        }
    

        const user = await userModel.create({
            user_name,
            email
        });
        const token = jwt.sign({
            id: user._id,
            user_name,
            email
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
        const { email } = req.body
        if (!(email)) {
            return res.status(400).json({
                message: "All fields are required",
                res: null
            })
        }
        const user = await userModel.findOne({ email });
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
const logoutUser = async (req,res) =>{
    try{
        const {user_id} = req.body

        if(!user_id){
            return res.status(400).json({
                message: "All fields are required",
                res: null
            })
        }

        const user = await userModel.findOne({ email });

        if(!user){
            return res.status(409).json({
                message: "User does not exists",
                res: null
            })
        }

        user.session_active  = false

        res.status(200).json({
            message: "User logged out",
            res: null
        })

    }catch(err){
        console.log(err);
    }
}
module.exports = {
    createUser,
    loginUser,
    logoutUser
}
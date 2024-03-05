const userModel = require('../models/user_model')
const jwt = require('jsonwebtoken')
const { sendOTP } = require('./otp_controller')
const otpModel = require('../models/otp_model')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
//OTP MAILER
let transporter = nodemailer.createTransport({
    service:"gmail",
    user:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        type:"login",
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    }
})

const createUser = async(req,res) => {
    try{
        const{user_name,email} = req.body

        const otp = `${Math.floor(1000 + Math.random() * 9000)}`

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
          });
        
          const mailConfig = {
            from:process.env.AUTH_EMAIL,
            to:email,
            subject:"Verify your Email | NOVELNOOK",
            html:`<p>Enter <b>${otp}</b> in the app to verify your email address and complete your signup process</p><br/><p>This code <b>expires in 1hr</b></p>`
        }

        const hashedOTP = await bcrypt.hash(otp,15);

        const otpForUser = await otpModel.findOneAndUpdate({email:user.email},{
            email:user.email,
            otp:hashedOTP,
            created_at:Date.now(),
            expires_at:Date.now() + 3600000
        },{upsert:true})

        await transporter.sendMail(mailConfig);

        return res.status(200).json({
            message:"Account created and OTP sent",
            res:user
        })
    }catch(error){
        console.log(error);
    }
}
const loginUser = async (req, res) => {
    try {
        const { email } = req.body

        const otp = `${Math.floor(1000 + Math.random() * 9000)}`

        if (!(email)) {
            return res.status(400).json({
                message: "All fields are required",
                res: null
            })
        }
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(409).json({
                message: "User does not exists",
                res: null
            })
        }
        console.log(user.user_id);
        const mailConfig = {
            from:process.env.AUTH_EMAIL,
            to:email,
            subject:"Verify your Email | NOVELNOOK",
            html:`<p>Enter <b>${otp}</b> in the app to verify your email address and complete your signup process</p><br/><p>This code <b>expires in 1hr</b></p>`
        }

        const hashedOTP = await bcrypt.hash(otp,15);

        const otpForUser = await otpModel.findOneAndUpdate({email:user.email},{
            email:user.email,
            otp:hashedOTP,
            created_at:Date.now(),
            expires_at:Date.now() + 3600000
        },{upsert:true})

        
        const token = jwt.sign({
            id: user._id,
        },process.env.JWT_KEY)

        user.token = token;
        
        user.save();
        
        req.user_id = user.user_id;
        
        await transporter.sendMail(mailConfig);

        return res.status(200).json({
            message: "OTP Sent",
            res: {
                email: email
            }
        });

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
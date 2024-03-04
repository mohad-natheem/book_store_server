const userModel = require('../models/user_model')

const isAdmin = async (req,res,next)=>{
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];

    // if(token == null){
    //     return res.status(401).json({
    //         error:"Token is invalid"
    //     })
    // }
    // jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
    //     if(err){
    //         return res.status(403).json({
    //             error:"User not logged in"
    //         })
    //     }
    //     req.user = user
    //     next();
    // })
    const {id} = req.user;
    const user = await userModel.findById({_id:id});
    if(!user.is_admin){
        return res.status(403).json({
            message:" Access not permitted",
            res:null
        })
    }
    console.log(user);
    next()
    
}

module.exports = {
    isAdmin
}
const jwt = require("jsonwebtoken")

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(`User id ${req.user_id}`)
    if(token == null){
        return res.status(401).json({
            error:"Token is invalid"
        })
    }
    jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({
                error:"User not logged in"
            })
        }
        console.log(`user ${user.id}`);
        req.user = user
        next();
    })
    
}

module.exports = {
    authenticateToken
}
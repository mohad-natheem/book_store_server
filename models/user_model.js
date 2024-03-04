const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    user_name : {type:String, required:true},
    phone_number : {type:Number,required:true},
    current_otp : {type:Number},
    is_admin : {type: Boolean}
    
}, {
    timestamps: true
})

const user = mongoose.model('user', Userschema,'users')

module.exports = user
const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true},
    user_name : {type:String, required:true},
    phone_number : {type:Number,required:true},
    current_otp : {type:Number},
    is_admin : {type: Boolean,required:true,default:false},
    token: { type: String, required: false },

    
}, {
    timestamps: true,
})

const user = mongoose.model('user', Userschema,'users')

module.exports = user
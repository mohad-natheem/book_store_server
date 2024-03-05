const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:String,required:true},
    created_at:{type:String,required:true},
    expires_at:{type:String,required:true},
}, {
    timestamps: true
})

const otpCollection = mongoose.model('otp',otpSchema,'otps')

module.exports = otpCollection
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true},
    user_name : {type:String, required:true},
    email: { type: String, required: true },
    session_active : {type: Boolean, default: false},
    is_admin : {type: Boolean, default: false},
    token: { type: String, required: false },
}, {
    timestamps: true,
})

const user = mongoose.model('user', userSchema,'users')

module.exports = user
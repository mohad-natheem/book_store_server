const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    book_id: { type: String, required : true},
    current_page : {type:Number,default:0}
},{
    timestamps : true,
})


const progress = mongoose.model('progress',progressSchema,'progress')
module.exports = progress

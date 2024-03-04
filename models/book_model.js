const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    book_name : {type:String, required:true},
    author_name: { type: String, required: true },
    img: { type: String, default: String },
    pdf_url: { type: String, required: true },
    genre: { type: String, required: true },
    book_desc: { type: String, required: true },
    rent_amount: { type: Number, required:true },
    purchase_amount: {type: Number, required:true },
    pages: { type: Number, required: true },
    ratings:{type:Number, required : true}
}, {
    timestamps: true
})

const bookCollection = mongoose.model('book', bookSchema,'books')

module.exports = bookCollection

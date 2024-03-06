const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    book_id:{type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    book_name : {type:String, required:true},
    author_name: { type: String, required: true },
    image: { type: String,required : true },
    pdf: { type: String, required : true},
    genre: { type: String, required: true },
    book_desc: { type: String, required: true },
    rent_amount: { type: Number, required:true },
    purchase_amount: {type: Number, required:true },
    pages: { type: Number, required: true },
    ratings:{type:Number, required : true}
}, {
    timestamps: true,
})

const bookCollection = mongoose.model('book', bookSchema,'books')

module.exports = bookCollection

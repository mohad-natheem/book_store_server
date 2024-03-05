const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    transaction_id:{type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true},
    user_id: { type: String, required: true },
    book_id: { type: String, default: String },
    purchase_type: { type: String, default:null },
    due_date: { type: String, default: null },
    purchase_date: { type: Date, default: Date.now },
}, {
    timestamps: true,
})

const transactionCollection = mongoose.model('transaction', transactionSchema,'transactions')

module.exports = transactionCollection

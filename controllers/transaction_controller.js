const transactionModel = require('../models/transaction_model')
const progressModel = require('../models/progress_model')

const createTransaction = async(req,res) => {
    try{
        const {user_id,book_id,purchase_type,due_date} = req.body;
        if(!(user_id,book_id,purchase_type,due_date)){
            return res.status(400).json({
                'message': 'Please provide all fields',
                res:null
                
            })
        }
        const oldTransaction = await transactionModel.findOne(
            {
                user_id:user_id,
                book_id:book_id
            }
        )
        if(oldTransaction){
            return res.status(409).json({
                message:"You have already purchased this book",
                res:null
            })
        }
        const transaction = await transactionModel.create({
            user_id,
            book_id,
            purchase_type,
            due_date
        });
        transaction.save();
        console.log(user_id);
        const progress = await progressModel.create(
            {
                user_id,
                book_id
            }
        );
        progress.save();
       

        return res.status(200).json({
            message:"Book purchased successfully",
            res:book
        })
    }catch(error){
        console.log(error);
    }
}
const getTransactions = async(req,res) => {
    try{
        const transactions = await transactionModel.find({});

        return res.status(200).json({
            message:"Transactions retrieved",
            res:transactions
        })
    }catch(error){
        console.log(error);
    }
}

const progress = async(req,res)=>{
    try{
        const {user_id,book_id,current_page} = req.body;
        if(!(user_id,book_id))
        {
            return res.status(400).json({
                'message' : 'ALl fields are required',
                res:null
            })
        }
        const progress_update = await progressModel.updateOne({user_id:user_id,book_id:book_id},{
            user_id,
            book_id,
            current_page
        });
        return res.status(201).json({
            message :"updated",
            res : progress_update
        })
    } catch (error){
        console.log(error);
    }

}

module.exports = {
    createTransaction,
    getTransactions,
    progress
}
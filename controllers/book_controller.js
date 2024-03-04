const bookModel = require('../models/book_model')

const createBook = async(req,res) => {
    try{
        const {book_name,author_name,img,pdf_url,genre,book_desc,rent_amount,purchase_amount,pages,ratings} = req.body;
        if(!(book_name&&author_name&&img&&pdf_url&&genre&&book_desc&&rent_amount&&purchase_amount&&pages&&ratings)){
            return res.status(400).json({
                'message': 'All fields are required',
                res:null
                
            })
        }
        const book = await bookModel.create({
            book_name,
            author_name,
            img,
            pdf_url,
            genre,
            book_desc,
            rent_amount,
            purchase_amount,
            pages,
            ratings
        });
        book.save();

        return res.status(200).json({
            message:"book saved",
            res:book
        })
    }catch(error){
        console.log(error);
    }
}
const getBooks = async(req,res) => {
    try{
        const books = await bookModel.find({});

        return res.status(200).json({
            message:"Books retrieved",
            res:books
        })
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    createBook,
    getBooks
}
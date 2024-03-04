const bookModel = require('../models/book_model')

const createBook = async(req,res) => {
    try{
        const {author_name,img,pdf_url,genre,book_desc,rent_amount,purchase_amount,pages} = req.body;
        if(!(author_name&&img&&pdf_url&&genre&&book_desc&&rent_amount&&purchase_amount&&pages)){
            return res.status(400).json({
                'message': 'All fields are required',
                res:null
                
            })
        }
        const book = await bookModel.create({
            author_name,
            img,
            pdf_url,
            genre,
            book_desc,
            rent_amount,
            purchase_amount,
            pages
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

module.exports = {
    createBook
}
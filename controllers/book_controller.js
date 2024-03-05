const bookModel = require('../models/book_model')

const createBook = async (req, res) => {
    try {
        const image_url = req.protocol + "://" + req.get('host') + '/public/images/' + req.files.image[0].filename;
        const book_url = req.protocol + "://" + req.get('host') + '/public/books/' + req.files.pdf[0].filename;

        const { book_name, author_name, genre, book_desc, rent_amount, purchase_amount, pages, ratings } = req.body;
        console.log(book_name);
        if (!(book_name && author_name && genre && book_desc && rent_amount && purchase_amount && pages && ratings)) {
            return res.status(400).json({
                'message': 'All fields are required',
                res: null

            })
        }
        const oldBook = await bookModel.findOne(
            {
                book_name: book_name
            }
        )
        if (oldBook) {
            return res.status(409).json({
                message: "Book already exists",
                res: null
            })
        }
        const book = await bookModel.create({
            book_name,
            author_name,
            image: image_url,
            pdf: book_url,
            genre,
            book_desc,
            rent_amount,
            purchase_amount,
            pages,
            ratings
        });
        book.save();

        return res.status(200).json({
            message: "book saved",
            res: book
        })
    } catch (error) {
        console.log(error);
    }
}
const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.find({});

        return res.status(200).json({
            message: "Books retrieved",
            res: books
        })
    } catch (error) {
        console.log(error);
    }
}
const getBook = async (req, res) => {
    try {
        console.log("Entered get book")
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                message: "All fields are required",
                res: null
            })
        }

        const book = await bookModel.findOne({ book_id: id })
        if (!book) {
            return res.status(409).json({
                message: "Book not found",
                res: null
            })
        }
        return res.status(200).json({
            message: "Book retrieved",
            res: book
        })
    } catch (error) {
        console.log(error);
    }
}
const updateBook = async (req, res) => {
    try {
        const id = req.params.id
        const { book_name, author_name, img, pdf_url, genre, book_desc, rent_amount, purchase_amount, pages, ratings } = req.body;
        if (!(book_name && author_name && img && pdf_url && genre && book_desc && rent_amount && purchase_amount && pages && ratings)) {
            return res.status(400).json({
                'message': 'All fields are required',
                res: null

            })
        }
        const book = await bookModel.updateOne({ book_id: id }, {
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
        return res.status(201).json({
            message: "User updated",
            res: book
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteBook = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                message: "All fields are required",
                res: null
            });
        }
        const deletedUser = await bookModel.deleteOne({ book_id: id })

        return res.status(204).json({
            message: "User deleted",
            res: deletedUser
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook
}
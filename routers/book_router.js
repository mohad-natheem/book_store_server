const express = require('express')
const router = express.Router()

const { createBook,getAllBooks,getBook,updateBook,deleteBook} = require('../controllers/book_controller')

router.get('/:id',getBook)
router.get('/',getAllBooks);


module.exports = router
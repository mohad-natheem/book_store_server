const express = require('express')
const router = express.Router()

const { createBook,getAllBooks,getBook,updateBook,deleteBook} = require('../controllers/book_controller')

router.post('/',createBook);
router.get('/:id',getBook)
router.get('/',getAllBooks);
router.patch('/:id',updateBook);
router.delete('/:id',deleteBook);


module.exports = router
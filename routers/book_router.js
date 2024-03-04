const express = require('express')
const router = express.Router()

const { createBook,getBooks} = require('../controllers/book_controller')

router.post('/',createBook);
router.get('/',getBooks);

module.exports = router
const express = require('express')
const router = express.Router()

const { createBook} = require('../controllers/book_controller')


router.post('/',createBook);
router.get('/');
module.exports = router
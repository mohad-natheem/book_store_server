const express = require('express')
const router = express.Router()

const {updateBook,deleteBook,createBook} = require('../controllers/book_controller')
const {getUser,getUsers} = require("../controllers/user_controller")

//books
router.patch('/books/:id',updateBook);
router.delete('/books/:id',deleteBook);
router.post('/books',createBook);

//user
router.get('/users',getUsers);
router.get('users/:id',getUser);


module.exports = router
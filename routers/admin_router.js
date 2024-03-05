const express = require('express')
const router = express.Router()
const {uploadFile}  = require('../middlewares/file_middleware')
const {uploadPdf} = require("../middlewares/pdf_middleware")
const {updateBook,deleteBook,createBook} = require('../controllers/book_controller')
const {getUser,getUsers} = require("../controllers/user_controller")

//books
router.patch('/books/:id',updateBook);
router.delete('/books/:id',deleteBook);
router.post('/books',uploadFile.fields([
    {name: "image"},
    {name:"pdf"}
]),createBook);

//user
router.get('/users',getUsers);
router.get('users/:id',getUser);


module.exports = router
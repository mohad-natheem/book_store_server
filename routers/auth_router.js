const express = require('express')
const router = express.Router()

const { createUser,getUser,loginUser} = require('../controllers/auth_controller')

router.post('/signup',createUser);
router.post('/login',loginUser);


module.exports = router
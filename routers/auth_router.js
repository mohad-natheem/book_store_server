const express = require('express')
const router = express.Router()

const { createUser,getUser} = require('../controllers/auth_controller')

router.post('/signup',createUser);
router.post('/login',getUser);


module.exports = router
const express = require('express')
const router = express.Router()

const { verifyOTP} = require('../controllers/otp_controller')

router.post('/verify',verifyOTP);



module.exports = router
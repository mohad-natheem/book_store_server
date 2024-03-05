const express = require('express')
const router = express.Router()

const { sendOTP,verifyOTP} = require('../controllers/otp_controller')

router.get('/send',sendOTP)
router.get('/verify',verifyOTP);



module.exports = router
const express = require('express')
const router = express.Router()

const { progress } = require('../controllers/transaction_controller')

router.patch('/',progress);

module.exports = router
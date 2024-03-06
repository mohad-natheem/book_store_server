const express = require('express')
const router = express.Router()

const { progress,getProgress } = require('../controllers/transaction_controller')

router.patch('/',progress);
router.post('/',getProgress)

module.exports = router
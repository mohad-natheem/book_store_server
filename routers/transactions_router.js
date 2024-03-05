const express = require('express')
const router = express.Router()

const { createTransaction,getTransactions,getUserTransactions} = require('../controllers/transaction_controller')

router.post('/',createTransaction);
router.get('/',getTransactions);
router.get('/user_transactions',getUserTransactions);


module.exports = router
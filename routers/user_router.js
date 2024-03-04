const express = require('express')
const router = express.Router()

const {readUser, updateUser} = require('../controllers/user_controller')

router.get('/:id',readUser);
router.patch('/:id',updateUser);
module.exports = router
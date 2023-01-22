const express = require('express')

const router = express.Router()

// importing login and Register controller
const { register, login } = require('../controllers/auth')

// Router
router.route('/register').post(register)
router.route('/login').post(login)

module.exports = router
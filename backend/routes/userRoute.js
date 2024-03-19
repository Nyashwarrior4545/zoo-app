const express = require('express')

const {loginUser, registerUser,registerAdmin} = require('../controller/userController')


const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/register/admin', registerAdmin)


module.exports = router
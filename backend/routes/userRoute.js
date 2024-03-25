// userRoute

const express = require('express')
const {loginUser, registerUser,registerAdmin, getAllUsers, updateUser,deleteUser} = require('../controller/userController')
const requireAdmin = require('../middleware/requireAdmin');


const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/register/admin', registerAdmin)
router.get('/getalluser',requireAdmin, getAllUsers); // Route to get all users
router.put('/:userId',requireAdmin,  updateUser); // Route to update a user
router.delete('/:userId', requireAdmin, deleteUser); // Route to delete a user


module.exports = router
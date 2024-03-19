const User = require('../models/userModels')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET, {expiresIn: '1d'})

}   


// login a user
// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try{
        const user  = await User.login( email, password)

        if (!user) {
            return res.status(400).json({error: 'User not found'})
        }

        const token = createToken(user._id)

        res.status(200).json({email, token})

    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

const registerUser = async (req, res) => {
    const {name,email, password}= req.body

    try{
        const user  = await User.register(name, email, password)

        const token = createToken(user._id)

        res.status(200).json({email, token})

    }catch (error) {
        res.status(400).json({error: error.message})
    }
}
 
const registerAdmin = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const user = await User.register(name, email, password)

        // Set the user as an admin
        user.isAdmin = true
        await user.save()

        const token = createToken(user._id)

        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports = {
    loginUser,
    registerUser,
    registerAdmin
}
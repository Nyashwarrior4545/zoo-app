//userController
const User = require('../models/userModels')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const createToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET, {expiresIn: '1d'})

}   

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const token = createToken(user._id);

        // Include the _id field along with other necessary information
        res.status(200).json({ _id: user._id, email, token, isAdmin: user.isAdmin });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



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


// Function to get all users
const getAllUsers = async (req, res) => {
    try {
        // Find all users
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Function to update a user
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, email, password, isAdmin } = req.body;
    try {
        // Find the user by ID
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }
        user.isAdmin = isAdmin || user.isAdmin;

        // Save the updated user
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// fucton to delete users
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    loginUser,
    registerUser,
    registerAdmin,
    getAllUsers,
    updateUser,
    deleteUser
}
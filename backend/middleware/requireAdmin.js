
//requireAdmin
const jwt = require('jsonwebtoken')
const User = require ('../models/userModels')

const requireAdmin = async (req, res, next) => {
    try {
        // Verify user is authenticated
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({error: 'Authorization token required'});
        }

        // Extract token from Authorization header
        const token = authorization.split(' ')[1];

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const userId = decodedToken._id;

        // Fetch user from database
        const user = await User.findById(userId);

        // Check if user exists and is an admin
        if (!user || !user.isAdmin) {
            return res.status(403).json({error: 'Access forbidden. Admin permission required.'});
        }

        // User is an admin, allow access
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({error: 'Request is not authorized'});
    }
}

module.exports = requireAdmin;

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

//Create a schema for the user
const Schema = mongoose.Schema

const  userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
    })

    // Static register method

    userSchema.statics.register = async function(name, email, password){

        if(!name || !email || !password){
            throw new Error('Please fill in all fields')
        }
        if(!validator.isEmail(email)){
            throw new Error('Invalid email')
        }
        if(!validator.isStrongPassword(password)){
            throw new Error('Password is not strong enough')
        }
        const findUser = await this.findOne({email})
        if(findUser){
            throw new Error('User already exists')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new this({name, email, password: hashedPassword})
        return user.save()
    }



    // Static login method
    userSchema.statics.login = async function( email, password){
        if(!email || !password){
            throw new Error('Please fill in all fields')
        }

        const user = await this.findOne({email})
        if(!user){
            throw Error ('Inccorect Email')
        }

        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword){
            throw new Error('Incorrect Password')
        }
        return user;
    }

        // Static registerAdmin method
    userSchema.statics.registerAdmin = async function(name, email, password){
        if(!name || !email || !password){
            throw new Error('Please fill in all fields')
        }
        if(!validator.isEmail(email)){
            throw new Error('Invalid email')
        }
        if(!validator.isStrongPassword(password)){
            throw new Error('Password is not strong enough')
        }
        const findUser = await this.findOne({email})
        if(findUser){
            throw new Error('User already exists')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new this({name, email, password: hashedPassword, isAdmin: true})
        return user.save()
    }

    module.exports = mongoose.model('User', userSchema)
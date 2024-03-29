require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')
const ticketController = require ('./routes/ticketRoute')
const roomController = require ('./routes/roomRoute')
const bookingRoute = require ('./routes/bookingRoute')

const app = express()


// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



app.use('/zoo/user', userRoute)
app.use('/zoo/ticket', ticketController)
app.use('/zoo/room', roomController)
app.use('/zoo/room/payment/booking', bookingRoute)


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(process.env.PORT, () =>{
            console.log('connected to MongoDB and listening on port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error)
    })

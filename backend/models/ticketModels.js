//ticketModels



const mongoose = require('mongoose');
const validator = require('validator');

// create a schema for the ticket details
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    Type: {
      type: String,
      required: true
    },
    Price: {
      type: Number,
      required: true
    },
    cardNumber: {
      type: String,
      required: [true, 'Card number is required']
    },
    expiryDate: {
      type: String,
      required: [true, 'Expiry date is required']
    },
    CVV: {
      type: String,
      required: [true, 'CVV is required']
    },
    cardName: {
      type: String,
      required: [true, 'Card name is required']
    },
    bookingCode: {
      type: String,
      required: [true, 'Booking code is required']
    },
    ticketsSold: {
      type: Number,
      required: true, 
    }
  });

// Static method for validating the ticket details
ticketSchema.statics.validateTicketDetails = function(cardNumber, expiryDate, CVV) {

    // if(!date || !Type || !Price ||  !cardNumber || !expiryDate || !CVV || !cardName ){
    //     throw new Error('Please fill in all fields')
    // }
    if (!validator.isLength(cardNumber, { min: 11, max: 11 })) {
        throw new Error('Card number must be 11 digits.');
    }
    if (!validator.matches(expiryDate, /^\d{2}\/\d{2}$/)) {
        throw new Error('Expiry date must be in MM/YY format.');
    }
    if (!validator.isLength(CVV, { min: 3, max: 3 })) {
        throw new Error('CVV must be 3 digits.');
    }
    // Additional validation logic can be added as needed
};

module.exports = mongoose.model('ticketDetails', ticketSchema);

//bookingmodel.js
const mongoose = require('mongoose');
const validator = require('validator');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  cvv: {
    type: String,
    required: [true, 'CVV is required']
  },
  cardNumber: {
    type: String,
    required: [true, 'Card number is required']
  },
  expiryDate: {
    type: String,
    required: [true, 'Expiry date is required']
  },
  cardName: {
    type: String,
    required: [true, 'Card name is required']
  },
  bookingCode: {
    type: String,
    required: true
  }
});


bookingSchema.statics.validateBookingDetails = function (cardNumber, expiryDate, cvv, cardName) {
  if (!validator.isLength(cardNumber, { min: 11, max: 11 })) {
    throw new Error('Card number must be 11 digits.');
  }
  if (!validator.matches(expiryDate, /^\d{2}\/\d{2}$/)) {
    throw new Error('Expiry date must be in MM/YY format.');
  }
  if (!validator.isLength(cvv, { min: 3, max: 3 })) {
    throw new Error('CVV must be 3 digits.');
  }
  if (!validator.isAlpha(cardName)) {
    throw new Error('Card name must contain only alphabetic characters.');
  }
  // Additional validation logic can be added as needed
};
module.exports = mongoose.model('Booking', bookingSchema);

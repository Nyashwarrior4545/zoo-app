//bookingController
const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

// Function to generate a random alphanumeric code
const generateBookingCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 12; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const createBooking = async (req, res) => {
  const { userId, roomId, cvv, cardNumber, expiryDate, cardName } = req.body;
  try {
    // Validate booking details
    Booking.validateBookingDetails(cardNumber, expiryDate, cvv, cardName);

    // Generate a unique booking code
    const bookingCode = generateBookingCode();

    const booking = new Booking({ 
      userId, 
      roomId, 
      cvv, 
      cardNumber, 
      expiryDate, 
      cardName, 
      bookingCode  // Add the generated booking code to the booking data
    });
    await booking.save();
    await Room.findByIdAndUpdate(roomId, { available: false });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const bookings = await Booking.find({ userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createBooking, getBookings,getBookingsByUserId };


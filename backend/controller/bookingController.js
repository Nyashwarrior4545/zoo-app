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
    console.error('Error creating booking:', error);
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
    const bookings = await Booking.find({ userId }).populate('roomId'); // Populate room details
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by user ID:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateBooking = async (req, res) => {
  const bookingId = req.params.bookingId;
  const updatedBooking = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(bookingId, updatedBooking, { new: true });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  const bookingId = req.params.bookingId;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createBooking, getBookings,getBookingsByUserId, updateBooking, deleteBooking };


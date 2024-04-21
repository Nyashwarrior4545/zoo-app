const express = require('express');
const { createBooking, getBookings,getBookingsByUserId,updateBooking, deleteBooking  } = require('../controller/bookingController');

const router = express.Router();

router.post('/createbooking', createBooking);
router.get('/getbookings', getBookings);
router.get('/:userId', getBookingsByUserId);
// Update a booking
router.put('/:bookingId', updateBooking);

// Delete a booking
router.delete('/:bookingId', deleteBooking);
module.exports = router;

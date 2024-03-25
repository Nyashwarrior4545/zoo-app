const express = require('express');
const { createBooking, getBookings,getBookingsByUserId } = require('../controller/bookingController');

const router = express.Router();

router.post('/createbooking', createBooking);
router.get('/getbookings', getBookings);
router.get('/:userId', getBookingsByUserId);

module.exports = router;

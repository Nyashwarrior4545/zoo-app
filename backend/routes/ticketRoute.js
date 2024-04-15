const express = require('express');

const { bookTicket,
        getAllTickets,
        getsingleticket,
        deleteTicket,
        updateTicket } = require('../controller/ticketController');

const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// Route for booking a ticket 
router.post('/book', bookTicket);

// Route for getting all tickets with authentication
router.get('/:userId', requireAdmin, getAllTickets);

// Route for getting a single ticket 
router.get('/:id', getsingleticket);

// Route for deleting a ticket
router.delete('/:id', deleteTicket);

// Route for updating a ticket
router.put('/:id', updateTicket);

module.exports = router;

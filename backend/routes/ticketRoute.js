//ticketRoute
const express = require('express');

const { bookTicket,
        getAllTickets,
        getsingleticket} =require('../controller/ticketController')

const requireAuth = require( '../middleware/requireAuth')

// require auth for all ticket routes
const router = express.Router()



// Route for booking a ticket 
router.post('/book',bookTicket);

// Route for getting all ticket with authentication

router.get('/',requireAuth, getAllTickets);


// Route for getting single ticket 

router.get('/:id',getsingleticket);


module.exports = router;

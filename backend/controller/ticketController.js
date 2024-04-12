
//ticketController
const Ticket = require('../models/ticketModels'); // Importing the Ticket model
const mongoose = require('mongoose')

// Function to generate a random booking code
const generateBookingCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 12; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};

// Controller function for booking a ticket
const bookTicket = async (req, res) => {
    try {
        const { date, Type, Price, cardNumber, expiryDate, CVV, cardName } = req.body; // Extracting data from the request body

        // Generate a booking code
        const bookingCode = generateBookingCode();

        // Get the start and end of the given date
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Check if ticketsSold for the given date has reached the limit (100)
        const ticketsSoldForDate = await Ticket.countDocuments({ date: { $gte: startOfDay, $lte: endOfDay } });
        if (ticketsSoldForDate >= 3) {
            return res.status(400).json({ error: 'Tickets sold out for this date' });
        }
        const ticketsSold = ticketsSoldForDate + 1; // Increment by 1 to start from 1

        // Validating ticket details
        Ticket.validateTicketDetails(cardNumber, expiryDate, CVV);

        // Creating a new ticket instance
        const ticket = new Ticket({
            date,
            Type,
            Price,
            cardNumber,
            expiryDate,
            CVV,
            cardName,
            bookingCode, // Include the booking code in the ticket object
            ticketsSold,
        });

        // Saving the ticket to the database
        await ticket.save();

        // Increment ticketsSold count for the corresponding date
        await Ticket.updateOne({ date: { $gte: startOfDay, $lte: endOfDay } }, { $inc: { ticketsSold: 1 } });

        res.status(201).json({ message: 'Ticket booked successfully!', ticket });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};


const getAllTickets = async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated user
        const tickets = await Ticket.find({ userId }); // Find tickets associated with the user
        res.status(200).json({ tickets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user tickets' });
    }
}

const getsingleticket = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such ticket' });
    }

    try {
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res.status(404).json({ error: 'No such ticket' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching ticket' });
    }
};

module.exports = {
    bookTicket,
    getAllTickets,
    getsingleticket
};
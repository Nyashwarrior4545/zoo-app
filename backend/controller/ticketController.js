
//ticketController
const Ticket = require('../models/ticketModels'); // Importing the Ticket model
const mongoose = require('mongoose')

// Controller function for booking a ticket
const bookTicket = async (req, res) => {
    try {
        const { date, Type, Price, cardNumber, expiryDate, CVV, cardName } = req.body; // Extracting data from the request body

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
            cardName
        });

        // Saving the ticket to the database
        await ticket.save();

        res.status(201).json({ message: 'Ticket booked successfully!', ticket });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
    
};

const getAllTickets = async (req, res) => {
    try {
        // Fetch all tickets from the database
        const tickets = await Ticket.find();
        
        res.status(200).json({ tickets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching tickets' });
    }
}


const getsingleticket = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such ticket'})
      }
    
      const ticket = await Ticket.findById(id)
    
      if (!ticket) {
        return res.status(404).json({error: 'No such ticket'})
      }
      
      res.status(200).json(ticket)
    

}
module.exports = {
    bookTicket,
    getAllTickets,
    getsingleticket
}

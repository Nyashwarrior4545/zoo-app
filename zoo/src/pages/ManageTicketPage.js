// ManageTicketPage.js
import React, { useEffect, useState } from 'react';
import Layout from '../componets/Layout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTicketContext } from '../hooks/useTicketContext';
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ManageTicketPage = () => {
  const { user } = useAuthContext();
  const { tickets, dispatch } = useTicketContext();
  const [editTicket, setEditTicket] = useState(null);
  const [editedTicket, setEditedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (user?.token) {
          const userId = user._id;
          const response = await fetch(`/zoo/ticket/${userId}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          const json = await response.json();

          if (response.ok) {
            dispatch({ type: 'ADD_TICKET', payload: json.tickets });
          }
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [dispatch, user, editedTicket]); // Add editedTicket as a dependency


  const handleEditTicket = (ticket) => {
    setEditTicket(ticket);
    setEditedTicket({ ...ticket });
  };

  const handleUpdateTicket = async () => {
    try {
      if (!editedTicket) return;
  
      const response = await fetch(`/zoo/ticket/${editTicket._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(editedTicket)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Ticket updated successfully:', data);
        dispatch({ type: 'UPDATE_TICKET', payload: data });
        setEditTicket(null);
        setEditedTicket(null);
      } else {
        console.error('Failed to update ticket:', data.error);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      const response = await fetch(`/zoo/ticket/${ticketId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });

      if (response.ok) {
        dispatch({ type: 'DELETE_TICKET', payload: ticketId });
      } else {
        console.error('Failed to delete ticket');
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div>
        <h1>Manage Tickets</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Price</th>
              <th>Card Number</th>
              <th>Expiry Date</th>
              <th>CVV</th>
              <th>Card Name</th>
              <th>Booking Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets && tickets.map(ticket => (
              <tr key={ticket._id}>
                <td>{new Date(ticket.date).toLocaleDateString('en-GB')}</td>
                <td>{editTicket && editTicket._id === ticket._id ?
                  <Form.Control as="select" name="Type" value={editedTicket.Type} onChange={handleInputChange}>
                    <option value="Regular">Regular</option>
                    <option value="VIP">VIP</option>
                  </Form.Control> : ticket.Type}
                </td>
                <td>{editTicket && editTicket._id === ticket._id ?
                  <Form.Control type="text" name="Price" value={editedTicket.Price} onChange={handleInputChange} readOnly />
                  : ticket.Price}
                </td>
                <td>{editTicket && editTicket._id === ticket._id ?
                  <Form.Control type="text" name="cardNumber" value={editedTicket.cardNumber} onChange={handleInputChange} />
                  : ticket.cardNumber}
                </td>
                <td>{editTicket && editTicket._id === ticket._id ?
                  <Form.Control type="text" name="expiryDate" value={editedTicket.expiryDate} onChange={handleInputChange} />
                  : ticket.expiryDate}
                </td>
                <td>{editTicket && editTicket._id === ticket._id ?
                  <Form.Control type="text" name="CVV" value={editedTicket.CVV} onChange={handleInputChange} />
                  : ticket.CVV}
                </td>
                <td>{editTicket && editTicket._id === ticket._id ?
                  <Form.Control type="text" name="cardName" value={editedTicket.cardName} onChange={handleInputChange} />
                  : ticket.cardName}
                </td>
                <td>{ticket.bookingCode}</td>
                <td>
                  {editTicket && editTicket._id === ticket._id ?
                    <Button variant="success" onClick={handleUpdateTicket}>Save</Button>
                    :
                    <Button variant="primary" onClick={() => handleEditTicket(ticket)}>Edit</Button>
                  }
                  {' '}
                  <Button variant="danger" onClick={() => handleDeleteTicket(ticket._id)}>Delete</Button>
                  <Link to = '/home'>
                    <Button>Buy Ticket</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default ManageTicketPage;
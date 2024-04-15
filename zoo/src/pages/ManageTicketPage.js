// ManageTicketPage.js
import React, { useEffect, useState } from 'react';
import Layout from '../componets/Layout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTicketContext } from '../hooks/useTicketContext';
import { Table, Button, Form,Modal } from 'react-bootstrap';


const ManageTicketPage = () => {
    const { user } = useAuthContext();
    const { tickets, dispatch } = useTicketContext();
    const [editTicket, setEditTicket] = useState(null);
    const [editedValues, setEditedValues] = useState({
      date: '',
      Type: '',
      Price: '',
      cardNumber: '',
      expiryDate: '',
      CVV: '',
      cardName: '',
      bookingCode: ''
    });
    const [showEditModal, setShowEditModal] = useState(false);
  
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
    }, [dispatch, user]);
  
    const handleEditTicket = (ticket) => {
        setEditTicket(ticket);
        setEditedValues(ticket);
        setShowEditModal(true);
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedValues(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleUpdateTicket = async () => {
        try {
          const response = await fetch(`/zoo/ticket/${editTicket._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(editedValues)
          });
    
          const data = await response.json();
    
          if (response.ok) {
            console.log('Ticket updated successfully:', data);
            if (data._id) {
              dispatch({ type: 'UPDATE_TICKET', payload: data });
            } else {
              console.error('Updated ticket data not found:', data);
            }
            setEditTicket(null);
            setShowEditModal(false);
          } else {
            console.error('Failed to update ticket:', data.error);
          }
        // Close the edit modal
        setShowEditModal(false);
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
  
    return (
        <Layout>
          <div>
            <h1>Manage Tickets</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Dates</th>
                  <th>Types</th>
                  <th>Prices</th>
                  <th>Card Numbers</th>
                  <th>Expiry Dates</th>
                  <th>CVV</th>
                  <th>Card Names</th>
                  <th>Booking Codes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets && tickets.map((ticket, index) => (
                  <tr key={index}>
                    <td>{new Date(ticket.date).toLocaleDateString('en-GB')}</td>
                    <td>{ticket.Type}</td>
                    <td>{ticket.Price}</td>
                    <td>{ticket.cardNumber}</td>
                    <td>{ticket.expiryDate}</td>
                    <td>{ticket.CVV}</td>
                    <td>{ticket.cardName}</td>
                    <td>{ticket.bookingCode}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleEditTicket(ticket)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => handleDeleteTicket(ticket._id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Ticket</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {editedValues && (
                  <Form onSubmit={handleUpdateTicket}>
                    <Form.Group >
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="text"
                        name="date"
                        value={editedValues.date}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group >
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        type="text"
                        name="Type"
                        value={editedValues.Type}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group >
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="Price"
                        value={editedValues.Price}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group >
                      <Form.Label>Exipry Date</Form.Label>
                      <Form.Control
                        type="text"
                        name="ExpiryDate"
                        value={editedValues.expiryDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group >
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="number"
                        name="CVV"
                        value={editedValues.CVV}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group >
                      <Form.Label>Card Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="cardName"
                        value={editedValues.cardName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    {/* Add similar Form.Group components for other ticket fields */}
                    <Button variant="primary" type="submit">
                      Update Ticket
                    </Button>
                  </Form>
                )}
              </Modal.Body>
            </Modal>
          </div>
        </Layout>
      );
    };
    
    export default ManageTicketPage;
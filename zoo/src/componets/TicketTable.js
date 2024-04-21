import React, { useEffect, useState } from 'react';
import Layout from '../componets/Layout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useBookingContext } from '../hooks/useBookingContext';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ManageBookingsPage = () => {
  const { bookings, dispatch } = useBookingContext();
  const { user } = useAuthContext();
  const [editBooking, setEditBooking] = useState(null);
  const [editedBooking, setEditedBooking] = useState(null); // State to store edited booking details

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (user?.token) {
          const userId = user._id;
          const response = await fetch(`/zoo/room/payment/booking/${userId}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });

          const json = await response.json();

          if (response.ok) {
            dispatch({ type: 'SET_BOOKINGS', payload: json });
          }
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [dispatch, user]);

  const handleEditBooking = (booking) => {
    setEditBooking(booking);
    // Set initial edited booking details excluding room title, room price, and user
    setEditedBooking({
      cvv: booking.cvv,
      cardNumber: booking.cardNumber,
      expiryDate: booking.expiryDate
    });
  };

  const handleUpdateBooking = async () => {
    try {
      const response = await fetch(`/zoo/room/payment/booking/${editBooking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(editedBooking)
      });

      if (response.ok) {
        // Update local bookings state
        const updatedBookings = bookings.map(booking =>
          booking._id === editBooking._id ? { ...booking, ...editedBooking } : booking
        );
        dispatch({ type: 'SET_BOOKINGS', payload: updatedBookings });
        setEditBooking(null);
      } else {
        console.error('Error updating booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`/zoo/room/payment/booking/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        // Remove deleted booking from local state
        const updatedBookings = bookings.filter(booking => booking._id !== bookingId);
        dispatch({ type: 'SET_BOOKINGS', payload: updatedBookings });
      } else {
        console.error('Error deleting booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBooking({ ...editedBooking, [name]: value });
  };

  return (
    <Layout>
      <div>
        <h1>Manage Bookings</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Room Title</th>
              <th>Room Price</th>
              <th>CVV</th>
              <th>Card Number</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings && bookings.map(booking => (
              <tr key={booking._id}>
                <td>{user.email}</td>
                <td>{booking.roomId.title}</td>
                <td>{booking.roomId.price}</td>
                <td>{editBooking && editBooking._id === booking._id ? (
                  <input
                    type="text"
                    name="cvv"
                    value={editedBooking.cvv}
                    onChange={handleInputChange}
                  />
                ) : (
                  booking.cvv
                )}</td>
                <td>{editBooking && editBooking._id === booking._id ? (
                  <input
                    type="text"
                    name="cardNumber"
                    value={editedBooking.cardNumber}
                    onChange={handleInputChange}
                  />
                ) : (
                  booking.cardNumber
                )}</td>
                <td>{editBooking && editBooking._id === booking._id ? (
                  <input
                    type="text"
                    name="expiryDate"
                    value={editedBooking.expiryDate}
                    onChange={handleInputChange}
                  />
                ) : (
                  booking.expiryDate
                )}</td>
                <td>
                  {editBooking && editBooking._id === booking._id ? (
                    <>
                      <Button variant="success" onClick={handleUpdateBooking}>Save</Button>{' '}
                      <Button variant="secondary" onClick={() => setEditBooking(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="primary" onClick={() => handleEditBooking(booking)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => handleDeleteBooking(booking._id)}>Delete</Button>
                      <Link to = '/home'>
                        <Button>Book Room</Button>
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Add form for creating new booking */}
      </div>
    </Layout>
  );
};

export default ManageBookingsPage;
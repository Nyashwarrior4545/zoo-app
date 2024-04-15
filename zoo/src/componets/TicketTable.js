import React, { useEffect, useState } from 'react';
import Layout from '../componets/Layout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useBookingContext } from '../hooks/useBookingContext';
import { Table, Button } from 'react-bootstrap';


const ManageBookingsPage = () => {
  const { bookings, dispatch } = useBookingContext();
  const { user } = useAuthContext();
  const [editBooking, setEditBooking] = useState(null);

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
  };

  const handleUpdateBooking = async (updatedBooking) => {
    // Implement update logic similar to user update logic
  };

  const handleDeleteBooking = async (bookingId) => {
    // Implement delete logic similar to user delete logic
  };

  return (
    <Layout>
      <div>
        <h1>Manage Bookings</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Room</th>
              <th>CVV</th>
              <th>Card Number</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings && bookings.map(booking => (
              <tr key={booking._id}>
                {/* Display user's email */}
                <td>{user.email}</td>
                <td>{booking.roomId}</td>
                <td>{booking.cvv}</td>
                <td>{booking.cardNumber}</td>
                <td>{booking.expiryDate}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEditBooking(booking)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteBooking(booking._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Add form for editing booking */}
        {/* Add form for creating new booking */}
      </div>
    </Layout>
  );
};

export default ManageBookingsPage;
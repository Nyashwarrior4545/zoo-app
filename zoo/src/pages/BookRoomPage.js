import React, { useState, useContext, useEffect } from 'react';
import Layout from '../componets/Layout';
import { BookingContext } from '../context/bookingContext';
import { Button, Card, Alert,Form  } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext'; // Import the useAuthContext hook

const BookRoomPage = () => {
    const { dispatch } = useContext(BookingContext);
    const { user } = useAuthContext(); // Get the user object from the authentication context
    console.log('User:', user); // Add this console.log to check if the user is fetched correctly

    const [formData, setFormData] = useState({
        userId: user ? user._id : null,
        roomId: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
    });
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch rooms data from the server
        const fetchRooms = async () => {
            try {
                const response = await fetch('/zoo/room/getallroom');
                const data = await response.json();
                if (response.ok) {
                    setRooms(data); // Set the rooms state with the fetched data
                } else {
                    setError(data.error); // Set error message if request fails
                }
            } catch (error) {
                setError('Error fetching rooms'); // Set error message if there's a network error
            }
        };

        fetchRooms();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithUserId = { ...formData, userId: user ? user._id : null };
            const response = await fetch('/zoo/room/payment/booking/createbooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formDataWithUserId)
            });
            const data = await response.json();
            if (response.ok) {
                dispatch({ type: 'CREATE_BOOKING', payload: data });
                setFormData({ userId: user ? user._id : null, roomId: '', cardNumber: '', expiryDate: '', cvv: '', cardName: '' }); // Reset formData after submission
                alert('Room successfully booked!'); // Display success message
    
                // Fetch rooms data again to update the list
                const fetchUpdatedRooms = async () => {
                    try {
                        const response = await fetch('/zoo/room/getallroom');
                        const data = await response.json();
                        if (response.ok) {
                            setRooms(data); // Set the rooms state with the fetched data
                        } else {
                            setError(data.error); // Set error message if request fails
                        }
                    } catch (error) {
                        setError('Error fetching rooms'); // Set error message if there's a network error
                    }
                };
                fetchUpdatedRooms();
            } else {
                setError(data.error); // Set error message if request fails
            }
            
        } catch (error) {
            setError('Error creating booking'); // Set error message if there's a network error
        }
    };
    
    const handleRoomSelect = (roomId) => {
        setFormData({ ...formData, roomId }); // Update roomId in formData when a room is selected
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <Layout>
            <div>
                <h1>Book a Room</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="card-container">
                    {rooms.map(room => (
                        <Card key={room._id} style={{ width: '18rem' }}>
                           <Card.Body>
                                <Card.Title>{room.title}</Card.Title>
                                <Card.Text>{room.detail}</Card.Text>
                                <Card.Text>{room.available ? 'Available' : 'Unavailable'}</Card.Text>
                                <Card.Text>{room.price}</Card.Text>
                                <Button
                                    variant={formData.roomId === room._id ? "danger" : "success"}
                                    disabled={!room.available} // Disable button if room is unavailable
                                    onClick={() => handleRoomSelect(room._id)}
                                >
                                    {formData.roomId === room._id ? "Unselect" : "Select"}
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                {formData.roomId && (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder="Enter card number"
                            />
                        </Form.Group>
                        <Form.Group controlId="expiryDate">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                placeholder="MM/YY"
                            />
                        </Form.Group>
                        <Form.Group controlId="cvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="Enter CVV"
                            />
                        </Form.Group>
                        <Form.Group controlId="cardName">
                            <Form.Label>Card Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleChange}
                                placeholder="Enter card name"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Book Room</Button>
                    </Form>
                )}
            </div>
        </Layout>
    );
};


export default BookRoomPage;
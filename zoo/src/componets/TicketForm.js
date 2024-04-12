//TicketForm
import { useState } from "react"
import { useTicketContext } from "../hooks/useTicketContext"
import { useAuthContext } from "../hooks/useAuthContext"
import './TicketForm.css'
import Calendar from 'react-calendar'; // Import the calendar component
import 'react-calendar/dist/Calendar.css'; // Import calendar CSS
import { Form, Button, Alert } from "react-bootstrap"; // Import Alert component from react-bootstrap
import TicketTable from './TicketTable';


const TicketForm = () => {
  const { dispatch } = useTicketContext();
  const { user } = useAuthContext();
  const [date, setDate] = useState(new Date());
  const [Type, setType] = useState("");
  const [Price, setPrice] = useState("");
  const [cardNumber, setcardNumber] = useState("");
  const [expiryDate, setexpiryDate] = useState("");
  const [CVV, setCVV] = useState("");
  const [cardName, setcardName] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [bookingCode, setBookingCode] = useState(null); // State to hold the booking code

  const ticketTypes = [
    { type: "Regular", price: 10 },
    { type: "VIP", price: 20 },
    { type: "Premium", price: 30 }
  ];

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    const selectedTicket = ticketTypes.find((ticket) => ticket.type === selectedType);
    if (selectedTicket) {
      setPrice(selectedTicket.price);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const ticket = {
      date,
      Type,
      Price,
      cardNumber,
      expiryDate,
      CVV,
      cardName
    };
    const response = await fetch("/zoo/ticket/book", {
      method: "POST",
      body: JSON.stringify(ticket),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    
    // Log the server response
    console.log("Server response:", json);
  
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(Array.isArray(json.emptyFields) ? json.emptyFields : []);
    }
    if (response.ok) {
      setDate(new Date());
      setType("");
      setPrice("");
      setcardNumber("");
      setexpiryDate("");
      setCVV("");
      setcardName("");
      setError(null);
      setEmptyFields([]);
      console.log("Server response:", json);
      if (json.ticket && json.ticket.bookingCode) {
        setBookingCode(json.ticket.bookingCode);
  console.log("Booking code:", json.ticket.bookingCode);
}

      dispatch({ type: "CREATE_TICKET", payload: json });
    }
};
  return (
    
    <div className="page-container">
      <div className="ticket-form-container">
        <div className="calendar-container">
        {bookingCode && <Alert variant="success">Your booking code is: {bookingCode}</Alert>} {/* Display booking code */}
          <Calendar
            onChange={handleDateChange}
            value={date}
            minDate={new Date()} // Disable past dates
          />
        </div>
        <Form className="ticket-form" onSubmit={handleSubmit}>
          <h3>Buy Now</h3>
          <Form.Group controlId="formDate">
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="text"
              value={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
              onClick={() => setShowCalendar(!showCalendar)}
              readOnly
              className={`ticket-input ${
                Array.isArray(emptyFields) && emptyFields.includes("date")
                  ? "error"
                  : ""
              }`}
            />
          </Form.Group>
          <Form.Group controlId="formType">
            <Form.Label>Ticket Type:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleTypeChange(e.target.value)}
              value={Type}
              className={`ticket-input ${
                Array.isArray(emptyFields) && emptyFields.includes("Type")
                  ? "error"
                  : ""
              }`}
            >
              <option value="">Select Ticket Type</option>
              {ticketTypes.map((ticket, index) => (
                <option key={index} value={ticket.type}>
                  {ticket.type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Ticket Price:</Form.Label>
            <Form.Control
              type="number"
              readOnly
              value={Price}
              className={`ticket-input ${
                Array.isArray(emptyFields) && emptyFields.includes("Price")
                  ? "error"
                  : ""
              }`}
            />
          </Form.Group>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Card Number:</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setcardNumber(e.target.value)}
              value={cardNumber}
              className={`ticket-input ${
                Array.isArray(emptyFields) && emptyFields.includes("cardNumber")
                  ? "error"
                  : ""
              }`}
            />
          </Form.Group>
          <Form.Group controlId="formExpiryDate">
            <Form.Label>Expiry Date:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setexpiryDate(e.target.value)}
              value={expiryDate}
              className={`ticket-input ${
                Array.isArray(emptyFields) && emptyFields.includes("expiryDate")
                  ? "error"
                  : ""
              }`}
            />
          </Form.Group>
          <Form.Group controlId="formCVV">
            <Form.Label>CVV:</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setCVV(e.target.value)}
              value={CVV}
              className={`ticket-input ${
                Array.isArray(emptyFields) && emptyFields.includes("CVV")
                  ? "error"
                  : ""
              }`}
            />
          </Form.Group>
          <Form.Group controlId="formCardName">
            <Form.Label>Card Name:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setcardName(e.target.value)}
              value={cardName}
              className={`ticket-input ${
                Array.isArray(emptyFields) && emptyFields.includes("cardName")
                  ? "error"
                  : ""
              }`}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="ticket-button">
            Book now
          </Button>
          
          {/* Error message */}
          {error && <div className="ticket-error">{error}</div>}
        </Form>
      </div>
      <TicketTable />

    </div>
  );
};

export default TicketForm;
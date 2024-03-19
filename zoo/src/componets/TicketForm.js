//TicketForm
import { useState } from "react"
import { useTicketContext } from "../hooks/useTicketContext"
import { useAuthContext } from "../hooks/useAuthContext"
import './TicketForm.css'
import Calendar from 'react-calendar'; // Import the calendar component
import 'react-calendar/dist/Calendar.css'; // Import calendar CSS

const TicketForm = () => {
  const { dispatch } = useTicketContext();
  const { user } = useAuthContext();
  const [date, setDate] = useState(new Date()); // Initialize date state with current date
  const [Type, setType] = useState('');
  const [Price, setPrice] = useState('');
  const [cardNumber, setcardNumber] = useState('');
  const [expiryDate, setexpiryDate] = useState('');
  const [CVV, setCVV] = useState('');
  const [cardName, setcardName] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false); // Hide calendar after selecting a date
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }
    const ticket = { date, Type, Price, cardNumber, expiryDate, CVV, cardName };
    const response = await fetch('/zoo/ticket/book', {
      method: 'POST',
      body: JSON.stringify(ticket),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(Array.isArray(json.emptyFields) ? json.emptyFields : []);
    }
    if (response.ok) {
      setDate(new Date()); // Reset date to current date after successful submission
      setType('');
      setPrice('');
      setcardNumber('');
      setexpiryDate('');
      setCVV('');
      setcardName('');
      setError(null);
      setEmptyFields([]);
      console.log('new ticket added', json);
      dispatch({ type: 'CREATE_TICKET', payload: json });
    }
  };

  return (
    <div className="page-container"> {/* Centering container */}
      <div className="ticket-form-container">
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={date}
            minDate={new Date()} // Disable past dates
          />
        </div>
        <form className="ticket-form" onSubmit={handleSubmit}>
          <h3>Book a Ticket Now</h3>
          <label className="ticket-label">Date:</label>
          <input
            type="text"
            value={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`} // Display selected date as text in "dd/mm/yyyy" format
            onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility on input click
            readOnly // Make input read-only
            className={`ticket-input ${Array.isArray(emptyFields) && emptyFields.includes('date') ? 'error' : ''}`}
          />
      <label className="ticket-label">Ticket Type:</label>
      <input 
        type="text"
        onChange={(e) => setType(e.target.value)}
        value={Type}
        className={`ticket-input ${Array.isArray(emptyFields) && emptyFields.includes('Type') ? 'error' : ''}`}
      />
      <label className="ticket-label">Ticket Price:</label>
      <input 
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={Price}
        className={`ticket-input ${Array.isArray(emptyFields) && emptyFields.includes('Price') ? 'error' : ''}`}
      />
      <label className="ticket-label">Card Number:</label>
      <input 
        type="number"
        onChange={(e) => setcardNumber(e.target.value)}
        value={cardNumber}
        className={`ticket-input ${Array.isArray(emptyFields) && emptyFields.includes('cardNumber') ? 'error' : ''}`}
      />
      <label className="ticket-label">Expiry Date:</label>
      <input 
        type="text"
        onChange={(e) => setexpiryDate(e.target.value)}
        value={expiryDate}
        className={`ticket-input ${Array.isArray(emptyFields) && emptyFields.includes('expiryDate') ? 'error' : ''}`}
      />
      <label className="ticket-label">CVV:</label>
      <input 
        type="number"
        onChange={(e) => setCVV(e.target.value)}
        value={CVV}
        className={`ticket-input ${Array.isArray(emptyFields) && emptyFields.includes('CVV') ? 'error' : ''}`}
      />
      <label className="ticket-label">Card Name:</label>
      < input 
        type="text"
        onChange={(e) => setcardName(e.target.value)}
        value={cardName}
        className={`ticket-input ${Array.isArray(emptyFields) && emptyFields.includes('cardName') ? 'error' : ''}`}
      />
      <button className="ticket-button">Book now</button>
      {error && <div className="ticket-error">{error}</div>}
    </form>
  </div>
  </div>
);
}
export default TicketForm
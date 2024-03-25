
//TicketDetails

import { useTicketContext } from '../hooks/useTicketContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect } from 'react'
// date fns
import Layout from'./Layout'
const TicketDetails = () => {
  const { tickets, dispatch } = useTicketContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/zoo/ticket/', {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const json = await response.json();

        console.log('Fetched tickets:', json);

        if (response.ok) {
          dispatch({ type: 'SET_TICKET', payload: json.tickets }); // Set the tickets in the context
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    if (user) {
      console.log('User:', user);
      fetchTickets();
    }
  }, [dispatch, user]);

  return (
    <Layout>
      <div>
      <h2>Ticket Details</h2>
      <ul>
        {tickets.map(ticket => ( // Map over tickets, not ticket
          <li key={ticket.id}>
            <p>ID: {ticket.id}</p>
            <p>Date: {ticket.date}</p>
            <p>Type: {ticket.type}</p>
            <p>Price: {ticket.price}</p>
            <p>ID: {ticket.cardNumber}</p>
            <p>Date: {ticket.expiryDate}</p>
            <p>Type: {ticket.CVV}</p>
            <p>Price: {ticket.cardName}</p>
          </li>
        ))}
      </ul>
    </div>

    </Layout>
    
  );
};

export default TicketDetails;
//useTicketContext.js

import { TicketContext } from '../context/ticketContext'; // Correct import
import { useContext } from 'react';

export const useTicketContext = () => { // Correct naming convention
  const context = useContext(TicketContext); // Use TicketContext here

  if (!context) {
    throw new Error('useTicketContext must be used inside a TicketContextProvider'); // Correct error message
  }

  return context;
};

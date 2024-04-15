//ticketContext.js
import { createContext, useReducer } from 'react';

export const TicketContext = createContext(); // Correct context name

export const ticketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TICKET': 
      return {
        ...state,
        tickets: action.payload
      };
    case 'ADD_TICKET':
      return { 
        ...state, 
        tickets: action.payload 
      };
    case 'CREATE_TICKET':
      const tickets = state.tickets || []; 
      return {
        ...state,
        tickets: [action.payload, ...tickets]
      };
    case 'DELETE_TICKET':
      const filteredTickets = state.tickets.filter(ticket => ticket._id !== action.payload);
      return {
        ...state,
        tickets: filteredTickets
      };
    case 'UPDATE_TICKET':
      const updatedTickets = state.tickets.map(ticket =>
        ticket._id === action.payload._id ? action.payload : ticket
      );
      return {
        ...state,
        tickets: updatedTickets
      };
    default:
      return state;
  }
};

export const TicketContextProvider  = ({ children }) => {
  const [state, dispatch] = useReducer(ticketReducer, {
    tickets: [] // Provide a default empty array for tickets
  });

  return (
    <TicketContext.Provider value={{ ...state, dispatch }}> {/* Use TicketContext */}
      { children }
    </TicketContext.Provider>
  );
};

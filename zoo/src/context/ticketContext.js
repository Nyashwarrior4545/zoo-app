//ticketContext.js
import { createContext, useReducer } from 'react';

export const TicketContext = createContext(); // Correct context name

export const ticketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TICKET': 
      return {
        ...state, // Spread the existing state
        tickets: action.payload // Rename ticket to tickets
      };
    case 'CREATE_TICKET':
      // Initialize state.tickets as an empty array if it's null or undefined
      const tickets = state.tickets || []; 
      return {
        ...state,
        tickets: [action.payload, ...tickets] // Rename ticket to tickets
      };
    default:
      return state; // Always have a default case
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

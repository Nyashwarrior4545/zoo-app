// BookingContext.js

import React, { createContext, useReducer } from 'react';

// Define the initial state for the bookings
const initialState = {
  bookings: []
};

// Create the BookingContext
export const BookingContext = createContext();

// Define the reducer function
export const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKINGS':
      return {
        ...state,
        bookings: action.payload
      };
    case 'CREATE_BOOKING':
      return {
        ...state,
        bookings: [action.payload, ...state.bookings]
      };
    default:
      return state;
  }
};

// Create the BookingContextProvider component
export const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

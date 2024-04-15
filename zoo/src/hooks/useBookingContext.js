import React, { createContext, useContext, useReducer } from 'react';

// Define initial state for bookings
const initialState = {
  bookings: [],
};

// Create a context for bookings
const BookingContext = createContext();

// Define reducer function to update bookings state
const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKINGS':
      return { ...state, bookings: action.payload };
    case 'UPDATE_BOOKING':
      // Implement logic to update a booking
      return state;
    case 'DELETE_BOOKING':
      // Implement logic to delete a booking
      return state;
    case 'ADD_BOOKING':
      // Implement logic to add a new booking
      return state;
    default:
      return state;
  }
};

// Create a custom hook to access and update bookings context
export const useBookingContext = () => useContext(BookingContext);

// Create a BookingProvider component to wrap your app and provide bookings context
export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ bookings: state.bookings, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

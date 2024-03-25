// UserContext.js

import React, { createContext, useReducer } from 'react';

// Create a context for managing user-related state
export const UserContext = createContext();

// Define the user reducer function to handle state updates
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => {
          if (user._id === action.payload._id) {
            return action.payload;
          }
          return user;
        })
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    case 'REGISTER_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    default:
      return state;
  }
};
  
// Create a context provider to wrap the application and provide user-related state
export const UserContextProvider = ({ children }) => {
  // Initialize state and dispatch using the user reducer
  const [state, dispatch] = useReducer(userReducer, {
    users: [] // Initialize users as an empty array
  });

  return (
    // Provide the user state and dispatch function through the context value
    <UserContext.Provider value={{ ...state, dispatch }}>
      { children }
    </UserContext.Provider>
  );
};

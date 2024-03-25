// authContext.js

import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { 
        ...state, 
        user: action.payload, 
        userid: action.payload._id, // Include userId from the user object
        isAdmin: action.payload.isAdmin 
      };
    case 'LOGOUT':
      return { user: null, userid: null, isAdmin: false }; // Reset userid on logout
    default:
      return state;
  }
};




export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    userid: null, // Initialize userId as null
    isAdmin: false
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);
  

  console.log('AuthContext state:', state); // Log the state to see if userId is set correctly
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


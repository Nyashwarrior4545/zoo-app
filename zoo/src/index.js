import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{ AuthContextProvider  } from './context/authContext';
import { TicketContextProvider } from './context/ticketContext';
import { UserContextProvider  } from './context/UserContext';
import { BookingContextProvider  } from './context/bookingContext';
import { BookingProvider } from './hooks/useBookingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <AuthContextProvider>
        <UserContextProvider>
          <BookingProvider>
          <BookingContextProvider>
          <TicketContextProvider>
              <App />
          </TicketContextProvider>
          </BookingContextProvider>
          </BookingProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
);



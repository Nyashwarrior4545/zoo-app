import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{ AuthContextProvider  } from './context/authContext';
import { TicketContextProvider } from './context/ticketContext';
import { UserContextProvider  } from './context/UserContext';
import { BookingContextProvider  } from './context/bookingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <AuthContextProvider>
        <UserContextProvider>
          <BookingContextProvider>
          <TicketContextProvider>
              <App />
          </TicketContextProvider>
          </BookingContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
);



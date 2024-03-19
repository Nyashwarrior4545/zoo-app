import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{ AuthContextProvider  } from './context/authContext';
import { TicketContextProvider } from './context/ticketContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <AuthContextProvider>
        <TicketContextProvider>
          <App />
        </TicketContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
);



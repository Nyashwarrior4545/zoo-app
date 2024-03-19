//App.js

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TicketPage from './pages/TicketPage';
import Register from './pages/Register';
import Navbar from '../src/componets/Navbar';
import TicketDetails from './componets/TicketDetails';
import { useAuthContext } from './hooks/useAuthContext';
// import Sidebar from '../src/componets/Sidebar'



function App() {
const {user} = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="pages">
          <Routes>
            <Route 
              path="/home"
              element={user? <TicketPage />: <Navigate to= "/login"/>}
            />
            <Route 
              path="/login" 
              element={!user? <Login />: <Navigate to= "/home"/>} 
            />
            <Route 
              path="/register" 
              element={!user? <Register />: <Navigate to = "/home"/>} 
            />
            <Route 
              path="/tickets" 
              element={user ? <TicketDetails /> : <Navigate to="/login" />} 
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;

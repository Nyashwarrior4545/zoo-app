//App.js

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TicketPage from './pages/TicketPage';
import Register from './pages/Register';
import Animals from './pages/animals';
import Manageuser from './pages/ManageUserPage';
import BookRoom from './pages/BookRoomPage';
import FacilitiesPage from './pages/FacilitiesPage';
import EducationPage from './pages/EducationPage';
import Termspage from './pages/Termspage';
import Policy from './pages/Policy';



import 'bootstrap/dist/css/bootstrap.min.css';

import TicketDetails from './componets/TicketDetails';
import { useAuthContext } from './hooks/useAuthContext';
import AccessibilityPage from './pages/Acess';



function App() {
const {user, isAdmin} = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>

        <div className="pages">
          <Routes>
            
            <Route 
              path="/home"
              element={<TicketPage />}
            />
            <Route 
              path="/login" 
              element={!user? <Login />: <Navigate to= "/"/>} 
            />
            <Route 
              path="/register" 
              element={!user? <Register />: <Navigate to = "/"/>} 
            />
            <Route 
              path="/tickets" 
              element={user?<TicketDetails />: <Navigate to= "/login"  />} 
            />
            <Route
              path='/'
              element={<Animals />}
            />
            <Route
              path='/bookroom'
              element={<BookRoom />}
            />

            <Route
              path='/facilities'
              element={<FacilitiesPage />}
            />

            <Route
              path='/education'
              element={<EducationPage />}
            />

            <Route
              path='/terms'
              element={<Termspage />}
            />

            <Route
              path='/policy'
              element={<Policy />}
            />

            <Route
              path='/access'
              element={<AccessibilityPage />}
            />

            <Route
              path='/manageuser'
              element={user && isAdmin ? <Manageuser /> : <Navigate to="/login" />} 
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;

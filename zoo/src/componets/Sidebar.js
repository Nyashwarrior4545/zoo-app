import React from 'react';
import { Link } from 'react-router-dom';
// import { useAuthContext } from '../hooks/useAuthContext';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <strong>
            Riget Zoo
          </strong>
        </h2>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/home" className="sidebar-link">Home</Link>
        </li>

        <li className="sidebar-item">
          <Link to="/" className="sidebar-link">Animals</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/manageuser" className="sidebar-link">Manage User</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/bookroom" className="sidebar-link">Book Room</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/facilities" className="sidebar-link">Facilities and attraction</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/education" className="sidebar-link">Education Vist</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

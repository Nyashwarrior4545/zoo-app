import { Link } from 'react-router-dom'; // import the Link component
import { useAuthContext } from '../hooks/useAuthContext';
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className="sidebar" style={{ position: 'fixed', zIndex: 1000, left: 0, top: 0 }}>
      <h2 className="sidebar-title">Navigation</h2>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/home" className="sidebar-link">Home</Link><br />
          <Link to="/tickets" className="sidebar-link">View Tickets</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

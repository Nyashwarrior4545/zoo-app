import {Link} from 'react-router-dom';  // import the Link component
import {useLogout} from '../hooks/useLougout'
import { useAuthContext } from '../hooks/useAuthContext';
import './Navbar.css';


const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext ()

    const handleClick = () => {
        logout()

    }

    return (
       <div className="hide" style={{ position: 'fixed', zIndex: 2000, left: 0, top: 0 }} >
        <nav className="navbar">
        <ul className="navbar-list">
           {user && (
               <li className="navbar-item">
                   <span className="navbar-user">{user.email}</span>
                   <button className="navbar-logout" onClick={handleClick}>Logout</button>
               </li>
           )}
           {!user && (
               <li className="navbar-item">
                   <Link to="/login" className="navbar-link">Login</Link>
                   <Link to="/register" className="navbar-link">Register</Link>
               </li>
           )}
       </ul>
   </nav>
</div>
    );
}
export default Navbar;
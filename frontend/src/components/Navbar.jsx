import {NavLink, useNavigate} from 'react-router-dom';
import './Navbar.css';
import { startTransition } from 'react';

// TODO: change this to the god selection page's address once that page is in main.
const TRAVEL_PAGE = '/travel';

/**
 * Top navigation bar shown on every page. NavLink highlights the page you're on.
 * isLoggedIn picks which links show; onLogout runs when Log out is clicked.
 */
function Navbar({isLoggedIn, onLogout}){
  const navigate = useNavigate();

  // Navigate home before updating the login state
  const handleLogout = () => {
    navigate('/');
    startTransition(() => onLogout());
  };

  return (
    <nav className="navbar" aria-label="Main">
      <NavLink to={isLoggedIn ? TRAVEL_PAGE : '/'} end className="navbar-logo">The Descent</NavLink>

      {isLoggedIn ? (
        // Logged in: back to the gods, your profile, and Log out
        <div className="navbar-links">
          <NavLink to={TRAVEL_PAGE} className="navbar-link">Gods</NavLink>
          <NavLink to="/profile" className="navbar-link navbar-icon" aria-label="Profile">
            {/* Simple person icon; aria-hidden because the link already says "Profile" */}
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>
            </svg>
          </NavLink>
          <button type="button" className="navbar-link navbar-button" onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        // Logged out: Log in, and Register as a pill button
        <div className="navbar-links">
          <NavLink to="/login" className="navbar-link">Log in</NavLink>
          <NavLink to="/registration" className="navbar-link navbar-button">Register</NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

import {NavLink} from 'react-router-dom';
import './Navbar.css';

/** Top navigation bar shown on every page. NavLink highlights the page you're on. */
function Navbar(){
  return (
    <nav className="navbar" aria-label="Main">
      <NavLink to="/" end className="navbar-logo">The Descent</NavLink>

      {/* Links on the right: Log in, and Register as a pill button */}
      <div className="navbar-links">
        <NavLink to="/login" className="navbar-link">Log in</NavLink>
        <NavLink to="/registration" className="navbar-link navbar-button">Register</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;

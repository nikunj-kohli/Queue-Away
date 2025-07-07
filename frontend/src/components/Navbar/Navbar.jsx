import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './Navbar.css';

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">QueueAway</Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/shops">Shops</Link> {/* Updated link */}
        {currentUser ? (
          <>
            <Link to="/myqueues">My Queues</Link>
            <button onClick={() => signOut(auth)}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/customer-signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
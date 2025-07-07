import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const user = auth.currentUser;

  return (
    <nav style={{
      display: 'flex',
      gap: '1rem',
      padding: '1rem',
      background: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#212529' }}>Home</Link>
      <Link to="/queue-directory" style={{ textDecoration: 'none', color: '#212529' }}>Shops</Link>
      
      {!user ? (
        <>
          <Link to="/login" style={{ textDecoration: 'none', color: '#212529' }}>Login</Link>
          <Link to="/customer-signup" style={{ textDecoration: 'none', color: '#212529' }}>Sign Up</Link>
        </>
      ) : (
        <>
          <Link to="/chat" style={{ textDecoration: 'none', color: '#212529' }}>Chat</Link>
          <Link to="/profile" style={{ textDecoration: 'none', color: '#212529' }}>Profile</Link>
          <button 
            onClick={() => signOut(auth)}
            style={{
              background: 'none',
              border: 'none',
              color: '#dc3545',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { loginWithEmail, loginWithGoogle } from '../../firebase.js'; // Fixed import path
import GoogleSignIn from './GoogleSignIn';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLoading: setGlobalLoading } = useAuth();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setGlobalLoading(true);
      await loginWithEmail(email, password);
      navigate(userType === 'customer' ? '/customer-dashboard' : '/business-dashboard');
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setGlobalLoading(true);
      await loginWithGoogle();
      navigate(userType === 'customer' ? '/customer-dashboard' : '/business-dashboard');
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/invalid-email':
        setError('Invalid email address');
        break;
      case 'auth/user-disabled':
        setError('Account disabled');
        break;
      case 'auth/user-not-found':
        setError('No account found with this email');
        break;
      case 'auth/wrong-password':
        setError('Incorrect password');
        break;
      case 'auth/too-many-requests':
        setError('Too many attempts. Try again later.');
        break;
      default:
        setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to QueueAway</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleEmailLogin}>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="auth-select"
          disabled={loading}
        >
          <option value="customer">Customer</option>
          <option value="business">Business</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          disabled={loading}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          disabled={loading}
          minLength={6}
          required
        />

        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login with Email'}
        </button>
      </form>

      <div className="auth-divider">
        <span>OR</span>
      </div>
      
      <GoogleSignIn 
        onClick={handleGoogleLogin}
        loading={loading}
      />

      <div className="auth-links">
        <p>
          Don't have an account?{' '}
          <a href={userType === 'customer' ? '/customer-signup' : '/business-signup'}>
            Sign up as {userType}
          </a>
        </p>
        <p>
          <a href="/forgot-password">Forgot password?</a>
        </p>
      </div>
    </div>
  );
}
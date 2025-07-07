import './Auth.css';

export default function GoogleSignIn({ onClick, loading }) {
  return (
    <button 
      onClick={onClick}
      className="google-signin-button"
      type="button"
      disabled={loading}
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
        alt="Google logo"
        className="google-logo"
      />
      {loading ? 'Signing in...' : 'Continue with Google'}
    </button>
  );
}
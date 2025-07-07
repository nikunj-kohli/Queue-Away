import React, { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/USER_ID`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100">
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '32px 40px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        minWidth: 320,
        textAlign: 'center'
      }}>
        <h2 className="fw-bold mb-3">Profile</h2>
        <div style={{ fontSize: '1.1rem', color: '#222', fontWeight: 600 }}>{user.name}</div>
        <div style={{ color: '#666', fontSize: '1rem', marginBottom: 8 }}>{user.email}</div>
      </div>
    </div>
  );
}

export default Profile;
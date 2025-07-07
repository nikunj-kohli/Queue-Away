import React from 'react';
import { Button } from 'react-bootstrap';

function ProfileMenu({ onProfile, onSettings, onLogout }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 10,
        boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
        padding: '12px 0',
        minWidth: 160,
        zIndex: 1000,
      }}
    >
      <Button
        variant="light"
        className="w-100 text-start px-4 py-2"
        style={{ border: 'none', borderRadius: 0, fontWeight: 500 }}
        onClick={onProfile}
      >
        Profile
      </Button>
      <Button
        variant="light"
        className="w-100 text-start px-4 py-2"
        style={{ border: 'none', borderRadius: 0, fontWeight: 500 }}
        onClick={onSettings}
      >
        Settings
      </Button>
      <Button
        variant="light"
        className="w-100 text-start px-4 py-2"
        style={{ border: 'none', borderRadius: 0, color: '#d32f2f', fontWeight: 500 }}
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default ProfileMenu;
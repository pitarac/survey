// src/components/LogoutButton.js
import React from 'react';

function LogoutButton({ handleLogout }) {
  return (
    <button onClick={handleLogout} style={{ padding: '10px' }}>
      Logout
    </button>
  );
}

export default LogoutButton;

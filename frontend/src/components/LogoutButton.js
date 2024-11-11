// src/components/LogoutButton.js
import React from 'react';

function LogoutButton({ handleLogout }) {
  return (
    <button 
      onClick={handleLogout} 
      style={{ float: 'right', padding: '10px', marginBottom: '20px', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '5px' }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;

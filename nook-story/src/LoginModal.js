import React, { useState } from 'react';
import { useUser } from './UserContext';

const LoginModal = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const { login } = useUser();

  const handleLogin = () => {
    if (username.trim()) {
      login(username.trim());
      onComplete();
    }
  };

  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <h2>Welcome to Nook&Story</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
        />
        <button onClick={handleLogin}>
          Enter Nook&Story
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

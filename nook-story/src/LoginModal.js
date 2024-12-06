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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to Nook&Story</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="w-full p-2 border rounded mb-4"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
        >
          Enter Nook&Story
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
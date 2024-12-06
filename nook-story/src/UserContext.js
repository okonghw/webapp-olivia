import React, { createContext, useContext, useState, useEffect } from 'react';

// Define friendship levels as constants
export const FRIEND_LEVELS = {
  OWNER: 'OWNER',
  BEST_FRIEND: 'BEST_FRIEND',
  FRIEND: 'FRIEND',
  ROOMMATE: 'ROOMMATE',
  VISITOR: 'VISITOR',
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Load user data from localStorage on mount
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    const savedFriends = localStorage.getItem('friends');
    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }
  }, []);

  const login = (username) => {
    // Check if this username already exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('existingUsers') || '[]');
    let user = existingUsers.find(u => u.username === username);
    
    if (!user) {
      // Only create a new user if username doesn't exist
      user = {
        id: Date.now().toString(),
        username,
        friendLevel: FRIEND_LEVELS.OWNER,
        createdAt: new Date().toISOString(),
      };
      existingUsers.push(user);
      localStorage.setItem('existingUsers', JSON.stringify(existingUsers));
    }
    
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const addFriend = (friendUsername, level = FRIEND_LEVELS.VISITOR) => {
    const newFriend = {
      id: Date.now().toString(),
      username: friendUsername,
      friendLevel: level,
      addedAt: new Date().toISOString(),
    };
    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    localStorage.setItem('friends', JSON.stringify(updatedFriends));
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      friends, 
      login, 
      logout, 
      addFriend,
      FRIEND_LEVELS 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
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
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      // Load friends list specific to this user
      const userFriends = JSON.parse(localStorage.getItem(`friends_${user.id}`) || '[]');
      setFriends(userFriends);
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
    
    // Load this user's friends list
    const userFriends = JSON.parse(localStorage.getItem(`friends_${user.id}`) || '[]');
    setFriends(userFriends);
  };

  const logout = () => {
    setCurrentUser(null);
    setFriends([]); // Clear friends list from state
    localStorage.removeItem('currentUser');
  };

  const addFriend = (friendUsername, level = FRIEND_LEVELS.VISITOR) => {
    if (!currentUser) return; // Guard clause

    const newFriend = {
      id: Date.now().toString(),
      username: friendUsername,
      friendLevel: level,
      addedAt: new Date().toISOString(),
    };
    
    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    
    // Store friends list specific to current user
    localStorage.setItem(`friends_${currentUser.id}`, JSON.stringify(updatedFriends));
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
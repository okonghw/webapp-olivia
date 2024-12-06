import React, { useState, useRef, useEffect } from 'react';
import { UserPlus, Users } from 'lucide-react';
import { useUser } from './UserContext';

const FriendsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendUsername, setNewFriendUsername] = useState('');
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);
  const { friends, addFriend } = useUser();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowAddFriend(false);
        setError('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddFriend = () => {
    const existingUsers = JSON.parse(localStorage.getItem('existingUsers') || '[]');
    const userExists = existingUsers.find(user => user.username === newFriendUsername);

    if (userExists) {
      const isFriendAlready = friends.find(friend => friend.username === newFriendUsername);
      if (isFriendAlready) {
        setError('This user is already your friend');
      } else {
        addFriend(newFriendUsername);
        setNewFriendUsername('');
        setShowAddFriend(false);
        setError('');
      }
    } else {
      setError('User not found');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-purple-600 hover:text-purple-800 transition-colors"
      >
        <Users size={24} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3">Friends List</h3>
            
            <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
              {friends.length === 0 ? (
                <p className="text-gray-500 text-sm">No friends added yet</p>
              ) : (
                friends.map(friend => (
                  <div 
                    key={friend.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span>{friend.username}</span>
                    <span className="text-xs text-gray-500">{friend.friendLevel}</span>
                  </div>
                ))
              )}
            </div>

            {showAddFriend ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={newFriendUsername}
                  onChange={(e) => setNewFriendUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full p-2 border rounded"
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={handleAddFriend}
                    className="flex-1 bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddFriend(false);
                      setNewFriendUsername('');
                      setError('');
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddFriend(true)}
                className="w-full flex items-center justify-center gap-2 p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                <UserPlus size={16} />
                Add Friend
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsList;
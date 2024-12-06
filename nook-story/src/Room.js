import React, { useState } from 'react';
import { Settings, Plus, Play, Image, X, ArrowLeft } from 'lucide-react';
import { useUser } from './UserContext';

// Access level constants to manage room visibility
const ACCESS_LEVELS = {
  PUBLIC: 'Public',
  PRIVATE: 'Private',
  FRIENDS_ONLY: 'Friends Only',
};

const Room = ({ house, onBackToMenu }) => {
  // Variables
  const [rooms, setRooms] = useState([
    { roomID: 'living-room', roomType: 'living-room', name: 'Living Room', accessLevel: ACCESS_LEVELS.PUBLIC },
    { roomID: 'study-room', roomType: 'study-room', name: 'Study Room', accessLevel: ACCESS_LEVELS.PUBLIC },
    { roomID: 'gaming-room', roomType: 'gaming-room', name: 'Gaming Room', accessLevel: ACCESS_LEVELS.PUBLIC },
    { roomID: 'personal-room', roomType: 'personal-room', name: 'Personal Room', accessLevel: ACCESS_LEVELS.PRIVATE },
  ]);

  // State variables for room settings
  const [activeRoom, setActiveRoom] = useState(rooms[0]); // Room currently being viewed
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Whether the settings modal is open
  const [showAccessDenied, setShowAccessDenied] = useState(false); // New state for access denied modal

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(house.name);
  const { currentUser } = useUser();

  // Room customization variables
  const [primaryColor, setPrimaryColor] = useState(house.primaryColor); // Room color setting
  const [accessLevel, setAccessLevelState] = useState(house.accessLevel || ACCESS_LEVELS.PUBLIC); // Access control

  // Methods:
  // Load the layout and elements of the selected room
  const loadRoom = (roomID) => {
    const room = rooms.find(r => r.roomID === roomID);
    // Simple access check - deny access to private rooms
    if (room.accessLevel === ACCESS_LEVELS.PRIVATE) {
      setShowAccessDenied(true);
      setTimeout(() => setShowAccessDenied(false), 3000);
      return;
    }
    setActiveRoom(room);
  };

  // Handle back button click
  const handleBack = () => {
    onBackToMenu();  // Call the callback instead of direct navigation
  };

  const handleNameUpdate = () => {
    if (editedName.trim()) {
      const houses = JSON.parse(localStorage.getItem('nookHouses') || '[]');
      const updatedHouses = houses.map(h =>
        h.id === house.id ? { ...h, name: editedName.trim() } : h
      );
      localStorage.setItem('nookHouses', JSON.stringify(updatedHouses));
      setIsEditing(false);
    }
  };

  // Adds a new decor item to the room (not yet implemented)
  const addDecorItem = (decorItem) => {
    console.log(`Added decor item: ${decorItem}`);
  };

  // Sets the room's access level (Public, Private, Friends Only)
  const setAccessLevel = (level) => {
    setAccessLevelState(level);
  };

  // Initiates media playback (e.g., for music, video)
  const playMedia = (mediaItem) => {
    console.log(`Playing media: ${mediaItem}`);
  };

  // Stops media playback
  const stopMedia = () => {
    console.log('Stopping media playback');
  };

  // Handle adding a new room to the house
  const addRoom = () => {
    const newRoom = {
      roomID: `room-${Date.now()}`,
      roomType: 'custom-room',
      name: `New Room ${rooms.length + 1}`,
      accessLevel: ACCESS_LEVELS.PUBLIC,
    };
    setRooms([...rooms, newRoom]);
  };

  // Save the room settings (color and access level) to localStorage
  const handleSaveSettings = () => {
    const updatedHouse = { ...house, primaryColor, accessLevel };

    // Update the house data in localStorage
    const houses = JSON.parse(localStorage.getItem('nookHouses') || '[]');
    const updatedHouses = houses.map((h) =>
      h.id === house.id ? updatedHouse : h
    );
    localStorage.setItem('nookHouses', JSON.stringify(updatedHouses));
    setIsSettingsOpen(false);
  };

  return (
    <div className="rooms-menu">
      {/* Access Denied Modal */}
      {showAccessDenied && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          You don't have permission to access this room
        </div>
      )}

      {/* Centered Image (Placeholder) */}
      <div className="image-container">
        <img
          src="placeholderNook.png"
          alt="Placeholder Nook"
          className="centered-image"
        />
      </div>

      {/* Top Menu Bar */}
      <div className="top-menu-bar">
        <div className="back-button-container">
          <button
            onClick={handleBack}
            className="text-purple-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          {isEditing && currentUser?.id === house.ownerId ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleNameUpdate}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleNameUpdate();
                }
              }}
              className="border rounded px-2 py-1 text-lg font-bold"
              autoFocus
            />
          ) : (
            <div
              className="house-name"
              onClick={() => {
                if (currentUser?.id === house.ownerId) {
                  setIsEditing(true);
                }
              }}
              style={{ cursor: currentUser?.id === house.ownerId ? 'pointer' : 'default' }}
            >
              {editedName}
            </div>
          )}
        </div>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="settings-button"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Room Title */}
      <h2 className="room-title">{activeRoom.name}</h2>

      {/* Room Display */}
      <div className="room-display">
        <div className={`room ${activeRoom.roomType}`}></div>
      </div>

      {/* Media and Decor Buttons */}
      <div className="media-decor-buttons">
        <button onClick={() => playMedia('Media item')}>
          <Play size={24} />
        </button>
        <button onClick={() => addDecorItem('Decor item')}>
          <Image size={24} />
        </button>
      </div>

      {/* Room Navigation */}
      <div className="room-navigation">
        <div className="rooms-list">
          {rooms.map((room) => (
            <button
              key={room.roomID}
              onClick={() => loadRoom(room.roomID)}
              className={`room-button ${activeRoom.roomID === room.roomID ? 'active' : ''}`}
            >
              {room.name}
            </button>
          ))}
        </div>
        <button onClick={addRoom} className="add-room-button">
          <Plus size={20} />
          Add Room
        </button>
      </div>

      {/* Room Settings Modal */}
      {isSettingsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Room Settings</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-500">
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Primary Color</label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full h-12 rounded"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Access Level</label>
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevelState(e.target.value)}
                className="w-full h-12 rounded border-gray-300 focus:ring focus:ring-purple-500 focus:border-purple-500"
              >
                {Object.values(ACCESS_LEVELS).map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="flex-1 py-2 px-4 rounded-lg bg-gray-100 text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="flex-1 py-2 px-4 rounded-lg bg-purple-600 text-white font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
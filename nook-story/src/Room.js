import React, { useState, useEffect } from 'react';
import { Settings, Plus, Play, Image, X } from 'lucide-react';
import { useUser } from './UserContext';

// Access level constants
const ACCESS_LEVELS = {
  PUBLIC: 'Public',
  PRIVATE: 'Private',
  FRIENDS_ONLY: 'Friends Only',
};

const Room = ({ house }) => {
  const { currentUser, FRIEND_LEVELS } = useUser();
  
  // All state variables
  const [rooms, setRooms] = useState([
    { roomID: 'living-room', roomType: 'living-room', name: 'Living Room', accessLevel: ACCESS_LEVELS.PUBLIC },
    { roomID: 'study-room', roomType: 'study-room', name: 'Study Room', accessLevel: ACCESS_LEVELS.PUBLIC },
    { roomID: 'gaming-room', roomType: 'gaming-room', name: 'Gaming Room', accessLevel: ACCESS_LEVELS.PUBLIC },
    { roomID: 'personal-room', roomType: 'personal-room', name: 'Personal Room', accessLevel: ACCESS_LEVELS.PRIVATE },
  ]);
  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(house.primaryColor);
  const [accessLevel, setAccessLevelState] = useState(house.accessLevel || ACCESS_LEVELS.PUBLIC);
  const [canEdit, setCanEdit] = useState(false);

  // Check user permissions whenever active room or user changes
  useEffect(() => {
    const checkPermissions = () => {
      if (!currentUser) return false;
      
      // If user is the house owner, they have full permissions
      if (house.ownerId === currentUser.id) return true;

      switch (currentUser.friendLevel) {
        case FRIEND_LEVELS.OWNER:
        case FRIEND_LEVELS.BEST_FRIEND:
          return true;
        case FRIEND_LEVELS.FRIEND:
          return activeRoom.accessLevel !== ACCESS_LEVELS.PRIVATE;
        case FRIEND_LEVELS.ROOMMATE:
          return activeRoom.accessLevel === ACCESS_LEVELS.PUBLIC;
        case FRIEND_LEVELS.VISITOR:
        default:
          return false;
      }
    };

    setCanEdit(checkPermissions());
  }, [currentUser, activeRoom, house.ownerId, FRIEND_LEVELS]);

  // Room management methods
  const loadRoom = (roomID) => {
    const room = rooms.find(r => r.roomID === roomID);
    setActiveRoom(room);
  };

  const addRoom = () => {
    if (!canEdit) return;
    
    const newRoom = {
      roomID: `room-${Date.now()}`,
      roomType: 'custom-room',
      name: `New Room ${rooms.length + 1}`,
      accessLevel: ACCESS_LEVELS.PUBLIC,
    };
    setRooms([...rooms, newRoom]);
  };

  // Media and decor methods
  const addDecorItem = (decorItem) => {
    if (!canEdit) return;
    console.log(`Added decor item: ${decorItem}`);
  };

  const playMedia = (mediaItem) => {
    console.log(`Playing media: ${mediaItem}`);
  };

  const stopMedia = () => {
    console.log('Stopping media playback');
  };

  // Settings methods
  const handleSaveSettings = () => {
    if (!canEdit) return;

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
      {/* Centered Image */}
      <div className="image-container">
        <img
          src="placeholderNook.png"
          alt="Placeholder Nook"
          className="centered-image"
        />
      </div>

      {/* Top Menu Bar */}
      <div className="top-menu-bar flex justify-between items-center mt-4">
        <div className="house-name">{house.name}</div>
        {canEdit && (
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="settings-button"
          >
            <Settings size={20} />
          </button>
        )}
      </div>

      {/* Room Title */}
      <h2 className="room-title">{activeRoom.name}</h2>

      {/* Room Display */}
      <div className="room-display">
        <div className={`room ${activeRoom.roomType}`}></div>
      </div>

      {/* Media and Decor Buttons - Only shown if user has edit permissions */}
      {canEdit && (
        <div className="media-decor-buttons">
          <button onClick={() => playMedia('Media item')}>
            <Play size={24} />
          </button>
          <button onClick={() => addDecorItem('Decor item')}>
            <Image size={24} />
          </button>
        </div>
      )}

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
        {canEdit && (
          <button onClick={addRoom} className="add-room-button">
            <Plus size={20} />
            Add Room
          </button>
        )}
      </div>

      {/* Settings Modal */}
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
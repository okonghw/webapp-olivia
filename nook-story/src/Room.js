import React, { useState } from 'react';
import { Settings, Plus, Play, Image, X } from 'lucide-react';

const ACCESS_LEVELS = {
  PUBLIC: 'Public',
  PRIVATE: 'Private',
  FRIENDS_ONLY: 'Friends Only',
};

const Room = ({ house }) => {
  const [rooms, setRooms] = useState([
    { id: 'living-room', name: 'Living Room', type: 'living-room' },
    { id: 'study-room', name: 'Study Room', type: 'study-room' },
    { id: 'gaming-room', name: 'Gaming Room', type: 'gaming-room' },
    { id: 'personal-room', name: 'Personal Room', type: 'personal-room' },
  ]);

  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(house.primaryColor);
  const [accessLevel, setAccessLevel] = useState(house.accessLevel || ACCESS_LEVELS.PUBLIC);

  const handleAddRoom = () => {
    const newRoom = {
      id: `room-${Date.now()}`,
      name: `New Room ${rooms.length + 1}`,
      type: 'custom-room',
    };
    setRooms([...rooms, newRoom]);
  };

  const handleSaveSettings = () => {
    const updatedHouse = { ...house, primaryColor, accessLevel };

    // Update in localStorage
    const houses = JSON.parse(localStorage.getItem('nookHouses') || '[]');
    const updatedHouses = houses.map((h) =>
      h.id === house.id ? updatedHouse : h
    );
    localStorage.setItem('nookHouses', JSON.stringify(updatedHouses));

    console.log('House updated:', updatedHouse);
    setIsSettingsOpen(false);
  };

  return (
    <div className="rooms-menu">
      {/* Top Menu Bar */}
      <div className="top-menu-bar flex justify-between items-center">
        <div className="house-name">{house.name}</div>
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
        <div className={`room ${activeRoom.type}`}></div>
      </div>

      {/* Media and Decor Buttons */}
      <div className="media-decor-buttons">
        <button>
          <Play size={24} />
        </button>
        <button>
          <Image size={24} />
        </button>
      </div>

      {/* Room Navigation */}
      <div className="room-navigation">
        <div className="rooms-list">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room)}
              className={`room-button ${activeRoom.id === room.id ? 'active' : ''}`}
            >
              {room.name}
            </button>
          ))}
        </div>
        <button onClick={handleAddRoom} className="add-room-button">
          <Plus size={20} />
          Add Room
        </button>
      </div>

      {/* Room Settings Modal */}
      {isSettingsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Room Settings</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-500">
                <X size={24} />
              </button>
            </div>

            {/* Color Picker */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Primary Color</label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full h-12 rounded"
              />
            </div>

            {/* Access Level Selector */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Access Level</label>
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value)}
                className="w-full h-12 rounded border-gray-300 focus:ring focus:ring-purple-500 focus:border-purple-500"
              >
                {Object.values(ACCESS_LEVELS).map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Modal Footer Buttons */}
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
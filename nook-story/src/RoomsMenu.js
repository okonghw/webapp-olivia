import React, { useState } from 'react';
import { Settings, Plus, Play, Square, Image, Users } from 'lucide-react';
import Room from './Room';

const ACCESS_LEVELS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  FRIENDS_ONLY: 'friends_only'
};

const RoomsMenu = ({ house, onSettingsOpen }) => {
  const [rooms, setRooms] = useState([
    { id: 'living-room', name: 'Living Room', type: 'living-room' },
    { id: 'study-room', name: 'Study Room', type: 'study-room' },
    { id: 'gaming-room', name: 'Gaming Room', type: 'gaming-room' },
    { id: 'personal-room', name: 'Personal Room', type: 'personal-room' }
  ]);

  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [accessLevel, setAccessLevel] = useState(ACCESS_LEVELS.PUBLIC);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDecorModal, setShowDecorModal] = useState(false);

  const handleAddRoom = () => {
    const newRoom = {
      id: `room-${Date.now()}`,
      name: `New Room ${rooms.length + 1}`,
      type: 'custom-room'
    };
    setRooms([...rooms, newRoom]);
  };

  const handleAccessLevelChange = (level) => {
    setAccessLevel(level);
  };

  const toggleMedia = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="rooms-menu">
      <header className="header">
        <div className="flex items-center gap-4">
          <h1>{house.name}</h1>
          <div className="flex items-center bg-gray-100 rounded-lg px-2">
            <Users size={20} className="text-gray-500 mr-2" />
            <select 
              value={accessLevel}
              onChange={(e) => handleAccessLevelChange(e.target.value)}
              className="bg-transparent py-2 pr-8 pl-2 text-sm focus:outline-none"
            >
              {Object.entries(ACCESS_LEVELS).map(([key, value]) => (
                <option key={key} value={value}>
                  {key.replace('_', ' ').charAt(0) + key.slice(1).toLowerCase().replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="settings-button" onClick={onSettingsOpen}>
          <Settings size={24} />
        </button>
      </header>

      <main className="room-display">
        <div className="room">
          <h2 className="text-2xl font-medium">{activeRoom.name}</h2>
        </div>
      </main>

      <nav className="room-navigation">
        <div className="flex justify-between items-center w-full max-w-6xl mx-auto px-4">
          <div className="flex gap-2">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room)}
                className={`room-button ${activeRoom.id === room.id ? 'active' : ''}`}
              >
                {room.name}
              </button>
            ))}
            <button onClick={handleAddRoom} className="add-room-button">
              <Plus size={20} />
              Add Room
            </button>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={toggleMedia}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isPlaying ? <Square size={20} /> : <Play size={20} />}
            </button>
            <button 
              onClick={() => setShowDecorModal(true)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Image size={20} />
            </button>
          </div>
        </div>
      </nav>

      {showDecorModal && (
        <div className="modal-overlay" onClick={() => setShowDecorModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Add Decor</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Plant', 'Lamp', 'Painting', 'Rug'].map((item) => (
                <button
                  key={item}
                  className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors"
                  onClick={() => {
                    // Handle adding decor
                    setShowDecorModal(false);
                  }}
                >
                  <Image size={24} className="mx-auto mb-2" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsMenu;
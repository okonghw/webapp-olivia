import React, { useState } from 'react';
import { Settings, Plus, Play, Image } from 'lucide-react';
import RoomSettingsModal from './RoomSettings';

const RoomsMenu = ({ house }) => {
  const [rooms, setRooms] = useState([
    { id: 'living-room', name: 'Living Room', type: 'living-room' },
    { id: 'study-room', name: 'Study Room', type: 'study-room' },
    { id: 'gaming-room', name: 'Gaming Room', type: 'gaming-room' },
    { id: 'personal-room', name: 'Personal Room', type: 'personal-room' }
  ]);

  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleAddRoom = () => {
    const newRoom = {
      id: `room-${Date.now()}`,
      name: `New Room ${rooms.length + 1}`,
      type: 'custom-room'
    };
    setRooms([...rooms, newRoom]);
  };

  const handleUpdateHouse = (updatedHouse) => {
    console.log('House updated:', updatedHouse);
  };

  return (
    <div className="rooms-menu">
      {/* Top Menu Bar */}
      <div className="top-menu-bar">
        <div className="house-name">
          {house.name} {/* Display the house name */}
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
        <button 
          onClick={handleAddRoom}
          className="add-room-button"
        >
          <Plus size={20} />
          Add Room
        </button>
      </div>

      {/* Room Settings Modal */}
      {isSettingsOpen && (
        <RoomSettingsModal
          house={house}
          onClose={() => setIsSettingsOpen(false)}
          onUpdateHouse={handleUpdateHouse}
        />
      )}
    </div>
  );
};

export default RoomsMenu;
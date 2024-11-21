import React, { useState } from 'react';
import { Settings, Plus } from 'lucide-react';

const RoomsMenu = ({ house, onSettingsOpen }) => {
  const [rooms, setRooms] = useState([
    { id: 'living-room', name: 'Living Room', type: 'living-room' },
    { id: 'study-room', name: 'Study Room', type: 'study-room' },
    { id: 'gaming-room', name: 'Gaming Room', type: 'gaming-room' },
    { id: 'personal-room', name: 'Personal Room', type: 'personal-room' }
  ]);

  const [activeRoom, setActiveRoom] = useState(rooms[0]);

  const handleAddRoom = () => {
    const newRoom = {
      id: `room-${Date.now()}`,
      name: `New Room ${rooms.length + 1}`,
      type: 'custom-room'
    };
    setRooms([...rooms, newRoom]);
  };

  return (
    <div className="rooms-menu">
      <header className="header">
        <h1>{house.name}</h1>
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
      </nav>
    </div>
  );
};

export default RoomsMenu;
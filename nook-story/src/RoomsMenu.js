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
    <div 
      className="rooms-menu min-h-screen flex flex-col" 
      style={{ backgroundColor: house.primaryColor + '20' }}
    >
      <div className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">{house.name}</h1>
        <button 
          onClick={onSettingsOpen}
          className="bubble-btn"
        >
          <Settings />
        </button>
      </div>

      <div className="flex-grow flex justify-center items-center">
        <div 
          className={`room ${activeRoom.type} w-3/4 h-96 rounded-lg shadow-lg`}
        >
          <h2 className="text-center text-xl p-4">{activeRoom.name}</h2>
        </div>
      </div>

      <div className="room-navigation flex justify-center gap-4 p-4">
        {rooms.map((room) => (
          <button 
            key={room.id}
            onClick={() => setActiveRoom(room)}
            className={`bubble-btn ${activeRoom.id === room.id ? 'opacity-100' : 'opacity-50'}`}
          >
            {room.name}
          </button>
        ))}
        <button 
          onClick={handleAddRoom}
          className="bubble-btn flex items-center gap-2"
        >
          <Plus /> Add Room
        </button>
      </div>
    </div>
  );
};

export default RoomsMenu;
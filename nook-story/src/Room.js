import React, { useState, useEffect } from 'react';
import { Settings, Play, Square, Image } from 'lucide-react';

// Room type definitions
const ROOM_TYPES = {
  LOUNGE: 'lounge',
  GAMING: 'gaming',
  MEETING: 'meeting',
  SOCIAL: 'social',
  'LIVING-ROOM': 'living-room',
  'STUDY-ROOM': 'study-room',
  'GAMING-ROOM': 'gaming-room',
  'PERSONAL-ROOM': 'personal-room'
};

const ACCESS_LEVELS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  FRIENDS_ONLY: 'friends_only'
};

const Room = ({ roomData, onUpdate }) => {
  // P0: Core state
  const [roomID] = useState(roomData.id);
  const [layout, setLayout] = useState(roomData.layout || {});
  
  // P1: Important features state
  const [roomType, setRoomType] = useState(roomData.type || ROOM_TYPES.SOCIAL);
  const [accessLevel, setAccessLevel] = useState(roomData.accessLevel || ACCESS_LEVELS.PUBLIC);
  const [media, setMedia] = useState(roomData.media || null);
  const [interactiveElements, setInteractiveElements] = useState(
    roomData.interactiveElements || []
  );
  
  // P2: Nice-to-have features state
  const [decorItems, setDecorItems] = useState(roomData.decorItems || []);

  // P0: Core method - Load room
  useEffect(() => {
    const loadRoom = async () => {
      try {
        // Simulate loading room data
        await new Promise(resolve => setTimeout(resolve, 500));
        setLayout(roomData.layout);
        // Update last accessed timestamp
        onUpdate({
          ...roomData,
          lastAccessed: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error loading room:', error);
      }
    };

    loadRoom();
  }, [roomID]);

  // P1: Media control methods
  const playMedia = () => {
    if (media) {
      setMedia({ ...media, isPlaying: true });
    }
  };

  const stopMedia = () => {
    if (media) {
      setMedia({ ...media, isPlaying: false });
    }
  };

  // P1: Access control method
  const setRoomAccess = (level) => {
    setAccessLevel(level);
    onUpdate({
      ...roomData,
      accessLevel: level
    });
  };

  // P2: Decor management method
  const addDecorItem = (newItem) => {
    setDecorItems([...decorItems, { ...newItem, id: Date.now() }]);
  };

  return (
    <div className="room-container p-4">
      {/* Room Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{roomData.name}</h2>
        <div className="flex gap-2">
          <select 
            value={accessLevel}
            onChange={(e) => setRoomAccess(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-100"
          >
            {Object.entries(ACCESS_LEVELS).map(([key, value]) => (
              <option key={key} value={value}>
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <button className="p-2 rounded-lg bg-gray-100">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Room Content */}
      <div className="room-content bg-gray-50 rounded-xl p-6 min-h-[400px]">
        {/* Media Controls */}
        {media && (
          <div className="media-controls flex gap-2 mb-4">
            <button 
              onClick={playMedia}
              className="p-2 rounded-lg bg-blue-600 text-white"
            >
              <Play size={20} />
            </button>
            <button 
              onClick={stopMedia}
              className="p-2 rounded-lg bg-blue-600 text-white"
            >
              <Square size={20} />
            </button>
          </div>
        )}

        {/* Interactive Elements */}
        <div className="interactive-elements grid grid-cols-2 gap-4 mb-4">
          {interactiveElements.map((element) => (
            <div 
              key={element.id}
              className="interactive-element p-4 bg-white rounded-lg shadow"
            >
              {element.content}
            </div>
          ))}
        </div>

        {/* Decor Items */}
        <div className="decor-items flex flex-wrap gap-4">
          {decorItems.map((item) => (
            <div 
              key={item.id}
              className="decor-item p-2 bg-white rounded-lg shadow"
            >
              <Image size={24} />
              <span className="ml-2">{item.name}</span>
            </div>
          ))}
          <button 
            onClick={() => addDecorItem({ name: 'New Decor' })}
            className="p-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-500"
          >
            Add Decor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
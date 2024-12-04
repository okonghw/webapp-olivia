import React, { useState } from 'react';
import { Settings, Plus, Play, Image, X } from 'lucide-react';

// Access level constants to manage room visibility
const ACCESS_LEVELS = {
  PUBLIC: 'Public',
  PRIVATE: 'Private',
  FRIENDS_ONLY: 'Friends Only',
};

const Room = ({ house }) => {
  // Variables
  const [rooms, setRooms] = useState([
    { roomID: 'living-room', roomType: 'living-room', name: 'Living Room' },
    { roomID: 'study-room', roomType: 'study-room', name: 'Study Room' },
    { roomID: 'gaming-room', roomType: 'gaming-room', name: 'Gaming Room' },
    { roomID: 'personal-room', roomType: 'personal-room', name: 'Personal Room' },
  ]);
  
  // State variables for room settings
  const [activeRoom, setActiveRoom] = useState(rooms[0]); // Room currently being viewed
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Whether the settings modal is open

  // Room customization variables
  const [primaryColor, setPrimaryColor] = useState(house.primaryColor); // Room color setting
  const [accessLevel, setAccessLevelState] = useState(house.accessLevel || ACCESS_LEVELS.PUBLIC); // Access control

  // Methods:

  // Load the layout and elements of the selected room
  const loadRoom = (roomID) => {
    const room = rooms.find(r => r.roomID === roomID);
    setActiveRoom(room); // Change the active room to the selected room
  };

  // Adds a new decor item to the room (not yet implemented)
  const addDecorItem = (decorItem) => {
    // Decor item logic would go here
    console.log(`Added decor item: ${decorItem}`);
  };

  // Sets the room's access level (Public, Private, Friends Only)
  const setAccessLevel = (level) => {
    setAccessLevelState(level); // Updates the room's access level
  };

  // Initiates media playback (e.g., for music, video)
  const playMedia = (mediaItem) => {
    // Media playback logic would go here
    console.log(`Playing media: ${mediaItem}`);
  };

  // Stops media playback
  const stopMedia = () => {
    // Logic to stop the media would go here
    console.log('Stopping media playback');
  };

  // Handle adding a new room to the house
  const addRoom = () => {
    const newRoom = {
      roomID: `room-${Date.now()}`, // Unique ID for the new room
      roomType: 'custom-room', // Type of room
      name: `New Room ${rooms.length + 1}`, // Default name for the new room
    };
    setRooms([...rooms, newRoom]); // Add the new room to the list of rooms
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

    console.log('House updated:', updatedHouse);

    setIsSettingsOpen(false); // Close settings modal
  };

  return (
    <div className="rooms-menu">
      {/* Centered Image (Placeholder) */}
      <div className="image-container">
        <img
          src="placeholderNook.png" // Assuming the image is in the public folder
          alt="Placeholder Nook"
          className="centered-image"
        />
      </div>

      {/* Top Menu Bar: Displays the house name and a button to open settings */}
      <div className="top-menu-bar flex justify-between items-center mt-4">
        <div className="house-name">{house.name}</div>
        <button
          onClick={() => setIsSettingsOpen(true)} // Opens settings modal
          className="settings-button"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Room Title: Displays the name of the currently active room */}
      <h2 className="room-title">{activeRoom.name}</h2>

      {/* Room Display: Displays the content of the currently active room */}
      <div className="room-display">
        <div className={`room ${activeRoom.roomType}`}></div>
      </div>

      {/* Media and Decor Buttons: Buttons for interacting with media or decor */}
      <div className="media-decor-buttons">
        <button onClick={() => playMedia('Media item')}>
          <Play size={24} />
        </button>
        <button onClick={() => addDecorItem('Decor item')}>
          <Image size={24} />
        </button>
      </div>

      {/* Room Navigation: List of buttons to switch between rooms */}
      <div className="room-navigation">
        <div className="rooms-list">
          {/* Render buttons for each room */}
          {rooms.map((room) => (
            <button
              key={room.roomID}
              onClick={() => loadRoom(room.roomID)} // Change the active room
              className={`room-button ${activeRoom.roomID === room.roomID ? 'active' : ''}`}
            >
              {room.name}
            </button>
          ))}
        </div>
        {/* Button to add a new room */}
        <button onClick={addRoom} className="add-room-button">
          <Plus size={20} />
          Add Room
        </button>
      </div>

      {/* Room Settings Modal: Modal that allows the user to change room settings */}
      {isSettingsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Modal Header: Title and button to close the modal */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Room Settings</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-500">
                <X size={24} />
              </button>
            </div>

            {/* Color Picker: Allows the user to select a primary color for the room */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Primary Color</label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)} // Updates the primary color
                className="w-full h-12 rounded"
              />
            </div>

            {/* Access Level Selector: Allows the user to select the access level of the room */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Access Level</label>
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value)} // Updates the access level
                className="w-full h-12 rounded border-gray-300 focus:ring focus:ring-purple-500 focus:border-purple-500"
              >
                {Object.values(ACCESS_LEVELS).map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Modal Footer Buttons: Cancel and Save buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setIsSettingsOpen(false)} // Close modal without saving changes
                className="flex-1 py-2 px-4 rounded-lg bg-gray-100 text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings} // Save settings and close modal
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
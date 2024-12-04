import React, { useState, useEffect } from 'react';
import { House, Plus } from 'lucide-react';
import Room from './Room';

const AppManager = () => {
  // ### Variables ###
  
  // Tracks the current screen ('nookhouse' or 'rooms')
  const [currentScreen, setCurrentScreen] = useState('nookhouse');
  
  // Holds the list of NookHouses fetched from localStorage
  const [nookHouses, setNookHouses] = useState([]);
  
  // The currently selected house (for Room view)
  const [selectedHouse, setSelectedHouse] = useState(null);

  // ### Methods ###

  /**
   * initializeApp:
   * Sets up the app by loading saved houses from localStorage on initial render.
   */
  useEffect(() => {
    const existingHouses = JSON.parse(localStorage.getItem('nookHouses') || '[]');
    setNookHouses(existingHouses); // Populate the nookHouses state
  }, []);

  /**
   * createNewNookHouse:
   * - Creates a new NookHouse with default settings.
   * - Saves the new house to localStorage and updates the state.
   * - Automatically selects the new house and navigates to the 'rooms' screen.
   */
  const createNewNookHouse = () => {
    const newHouse = {
      id: Date.now().toString(), // Unique ID based on the current timestamp
      name: 'New NookHouse', // Default house name
      primaryColor: '#6a5acd', // Default color (purple)
      createdAt: new Date().toISOString(), // Timestamp for when the house was created
    };

    // Update the list of NookHouses and save it in localStorage
    const updatedHouses = [...nookHouses, newHouse];
    localStorage.setItem('nookHouses', JSON.stringify(updatedHouses));
    setNookHouses(updatedHouses);

    // Automatically select the newly created house
    navigateToRoom(newHouse);
  };

  /**
   * navigateToRoom:
   * - Selects a NookHouse and navigates to the 'rooms' screen.
   * @param {Object} nookHouse - The selected nookHouse object.
   */
  const navigateToRoom = (nookHouse) => {
    setSelectedHouse(nookHouse); // Store the selected house in state
    setCurrentScreen('rooms'); // Switch to the 'rooms' screen
  };

  return (
    <div className="app-container">
      {/* ### NookHouse menu screen ### */}
      {currentScreen === 'nookhouse' && (
        <div className="nookhouse-menu p-6 bg-purple-600 min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white mb-8">Nook&Story</h1>

          {/* Display a message and button if no NookHouses exist */}
          {nookHouses.length === 0 ? (
            <div className="text-center">
              <p className="text-white mb-6">Welcome! Create your first NookHouse</p>
              <button
                onClick={createNewNookHouse} // Create a new house when clicked
                className="bubble-btn flex items-center justify-center gap-2"
              >
                <Plus /> Create New NookHouse
              </button>
            </div>
          ) : (
            // List of existing NookHouses
            <div className="w-full max-w-md">
              <h2 className="text-2xl text-white mb-4">Your NookHouses</h2>
              <div className="space-y-4">
                {/* Render a button for each existing house */}
                {nookHouses.map((house) => (
                  <button
                    key={house.id} // Unique key for each house
                    onClick={() => navigateToRoom(house)} // Navigate to the selected room
                    className="bubble-btn w-full flex items-center gap-4"
                    style={{ backgroundColor: house.primaryColor }} // Set the house color as the button background
                  >
                    <House />
                    <span>{house.name}</span>
                  </button>
                ))}
                {/* Button to add a new NookHouse */}
                <button
                  onClick={createNewNookHouse} // Create a new house when clicked
                  className="bubble-btn w-full flex items-center justify-center gap-2"
                >
                  <Plus /> Add New NookHouse
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ### Room view screen ### */}
      {currentScreen === 'rooms' && selectedHouse && (
        <Room house={selectedHouse} /> // Render the Room component for the selected house
      )}
    </div>
  );
};

export default AppManager;

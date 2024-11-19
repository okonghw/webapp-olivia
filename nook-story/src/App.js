import React, { useState } from 'react';
import NookHouseMenu from './NookHouseMenu';
import RoomsMenu from './RoomsMenu';
import RoomSettingsModal from './RoomSettings';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('nookhouse');
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleHouseSelected = (house) => {
    setSelectedHouse(house);
    setCurrentScreen('rooms');
  };

  const handleUpdateHouse = (updatedHouse) => {
    setSelectedHouse(updatedHouse);
  };

  return (
    <div className="app-container">
      {currentScreen === 'nookhouse' && (
        <NookHouseMenu onHouseSelected={handleHouseSelected} />
      )}

      {currentScreen === 'rooms' && selectedHouse && (
        <>
          <RoomsMenu 
            house={selectedHouse} 
            onSettingsOpen={() => setIsSettingsOpen(true)} 
          />
          
          {isSettingsOpen && (
            <RoomSettingsModal 
              house={selectedHouse}
              onClose={() => setIsSettingsOpen(false)}
              onUpdateHouse={handleUpdateHouse}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
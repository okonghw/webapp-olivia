import React, { useState } from 'react';
import NookHouseMenu from './NookHouseMenu';
import Room from './Room';

const AppManager = () => {
  const [currentScreen, setCurrentScreen] = useState('nookhouse');
  const [selectedHouse, setSelectedHouse] = useState(null);

  const handleHouseSelected = (house) => {
    setSelectedHouse(house);
    setCurrentScreen('rooms');
  };

  return (
    <div className="app-container">
      {/* Render NookHouseMenu on the main screen */}
      {currentScreen === 'nookhouse' && (
        <NookHouseMenu onHouseSelected={handleHouseSelected} />
      )}

      {/* Render Room component for the selected house */}
      {currentScreen === 'rooms' && selectedHouse && (
        <Room house={selectedHouse} />
      )}
    </div>
  );
};

export default AppManager;
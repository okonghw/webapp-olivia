import React, { useState, useEffect } from 'react';
import { House, Plus } from 'lucide-react';

const NookHouseMenu = ({ onHouseSelected }) => {
  const [nookHouses, setNookHouses] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    // Check existing nook houses in localStorage
    const existingHouses = JSON.parse(localStorage.getItem('nookHouses') || '[]');
    setNookHouses(existingHouses);
    setIsFirstTime(existingHouses.length === 0);
  }, []);

  const handleCreateNewHouse = () => {
    const newHouse = {
      id: Date.now().toString(),
      name: 'New NookHouse',
      primaryColor: '#6a5acd',
      createdAt: new Date().toISOString()
    };

    const updatedHouses = [...nookHouses, newHouse];
    localStorage.setItem('nookHouses', JSON.stringify(updatedHouses));
    setNookHouses(updatedHouses);
    onHouseSelected(newHouse);
  };

  const handleSelectHouse = (house) => {
    onHouseSelected(house);
  };

  return (
    <div className="nookhouse-menu p-6 bg-purple-600 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-white mb-8">Nook&Story</h1>
      
      {isFirstTime ? (
        <div className="text-center">
          <p className="text-white mb-6">Welcome! Create your first NookHouse</p>
          <button 
            onClick={handleCreateNewHouse}
            className="bubble-btn flex items-center justify-center gap-2"
          >
            <Plus /> Create New NookHouse
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <h2 className="text-2xl text-white mb-4">Your NookHouses</h2>
          <div className="space-y-4">
            {nookHouses.map((house) => (
              <button 
                key={house.id}
                onClick={() => handleSelectHouse(house)}
                className="bubble-btn w-full flex items-center gap-4"
                style={{ backgroundColor: house.primaryColor }}
              >
                <House />
                <span>{house.name}</span>
              </button>
            ))}
            <button 
              onClick={handleCreateNewHouse}
              className="bubble-btn w-full flex items-center justify-center gap-2"
            >
              <Plus /> Add New NookHouse
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NookHouseMenu;
import React, { useState, useEffect } from 'react';
import { House, Plus } from 'lucide-react';
import Room from './Room';
import { useUser } from './UserContext';
import LoginModal from './LoginModal';
import FriendsList from './FriendsList';

const AppManager = () => {
  const { currentUser } = useUser();
  const [showLogin, setShowLogin] = useState(!currentUser);
  const [currentScreen, setCurrentScreen] = useState('nookhouse');
  const [nookHouses, setNookHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const existingHouses = JSON.parse(localStorage.getItem('nookHouses') || '[]');
      setNookHouses(existingHouses);
    }
  }, [currentUser, refreshTrigger]);

  const createNewNookHouse = () => {
    const newHouse = {
      id: Date.now().toString(),
      name: 'New NookHouse',
      primaryColor: '#6a5acd',
      createdAt: new Date().toISOString(),
      ownerId: currentUser?.id,
    };

    const updatedHouses = [...nookHouses, newHouse];
    localStorage.setItem('nookHouses', JSON.stringify(updatedHouses));
    setNookHouses(updatedHouses);
    navigateToRoom(newHouse);
  };

  const navigateToRoom = (nookHouse) => {
    setSelectedHouse(nookHouse);
    setCurrentScreen('rooms');
  };

  return (
    <div className="app-container">
      {showLogin && <LoginModal onComplete={() => setShowLogin(false)} />}

      {!showLogin && currentScreen === 'nookhouse' && (
        <div className="nookhouse-menu p-6 bg-purple-600 min-h-screen flex flex-col justify-center items-center relative">
        <div className="absolute top-4 right-4">
          <FriendsList />
        </div>
          <h1 className="text-4xl font-bold text-white mb-8">Welcome to Nook&Story, {currentUser?.username}!</h1>

          {nookHouses.length === 0 ? (
            <div className="text-center">
              <p className="text-white mb-6">Create your first NookHouse</p>
              <button
                onClick={createNewNookHouse}
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
                    onClick={() => navigateToRoom(house)}
                    className="bubble-btn w-full flex items-center gap-4"
                    style={{ backgroundColor: house.primaryColor }}
                  >
                    <House />
                    <span>{house.name}</span>
                  </button>
                ))}
                <button
                  onClick={createNewNookHouse}
                  className="bubble-btn w-full flex items-center justify-center gap-2"
                >
                  <Plus /> Add New NookHouse
                </button>
              </div>
            </div>
          )}
        </div>
      )}


      {!showLogin && currentScreen === 'rooms' && selectedHouse && (
        <Room
          house={selectedHouse}
          onBackToMenu={() => {
            setCurrentScreen('nookhouse');
            setRefreshTrigger(prev => prev + 1); // Trigger refresh of house list
          }}
        />
      )}
    </div>
  );
};

export default AppManager;
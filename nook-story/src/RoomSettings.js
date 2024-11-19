import React, { useState } from 'react';
import { X } from 'lucide-react';

const RoomSettingsModal = ({ house, onClose, onUpdateHouse }) => {
  const [primaryColor, setPrimaryColor] = useState(house.primaryColor);

  const handleSave = () => {
    const updatedHouse = { ...house, primaryColor };
    
    // Update in localStorage
    const houses = JSON.parse(localStorage.getItem('nookHouses') || '[]');
    const updatedHouses = houses.map(h => 
      h.id === house.id ? updatedHouse : h
    );
    localStorage.setItem('nookHouses', JSON.stringify(updatedHouses));

    onUpdateHouse(updatedHouse);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">House Settings</h2>
          <button onClick={onClose} className="text-gray-500">
            <X />
          </button>
        </div>

        <div className="color-picker mb-4">
          <label className="block mb-2">Primary Color</label>
          <input 
            type="color" 
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-full h-12"
          />
        </div>

        <div className="flex justify-between">
          <button 
            onClick={onClose}
            className="bubble-btn bg-gray-200 text-black"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="bubble-btn"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomSettingsModal;
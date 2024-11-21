import React, { useState } from 'react';
import { X } from 'lucide-react';

const RoomSettingsModal = ({ house, onClose, onUpdateHouse }) => {
  const [primaryColor, setPrimaryColor] = useState(house.primaryColor);

  const handleSave = () => {
    const updatedHouse = { ...house, primaryColor };
    const houses = JSON.parse(localStorage.getItem('nookHouses') || '[]');
    const updatedHouses = houses.map(h => 
      h.id === house.id ? updatedHouse : h
    );
    localStorage.setItem('nookHouses', JSON.stringify(updatedHouses));
    onUpdateHouse(updatedHouse);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">House Settings</h2>
          <button onClick={onClose} className="text-gray-500">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2">Primary Color</label>
          <input 
            type="color" 
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-full h-12 rounded"
          />
        </div>

        <div className="flex justify-between gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-2 px-4 rounded-lg bg-gray-100 text-gray-900 font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-2 px-4 rounded-lg bg-blue-600 text-white font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomSettingsModal;
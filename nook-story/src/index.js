import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppManager from './AppManager';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AppManager />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
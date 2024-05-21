import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './reducers';

// Configure the store using Redux Toolkit
const store = configureStore({
  reducer: appReducer,
});

// Get the root element
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

// Render the application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

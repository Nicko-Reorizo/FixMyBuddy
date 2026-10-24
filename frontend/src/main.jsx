import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { CustomerProvider } from './context/CustomerProvider.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <CustomerProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CustomerProvider>
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>,
);

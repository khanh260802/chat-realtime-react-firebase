import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import AuthProvider from './contexts/AuthProvider';
import ChatProvider from './contexts/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChatProvider>
    <AuthProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </AuthProvider>
  </ChatProvider>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className="purple-dark text-foreground bg-background">
      <App />
    </main>
  </React.StrictMode>,
);

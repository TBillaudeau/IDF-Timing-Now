import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router} from 'react-router-dom';


// In your main JavaScript file (e.g., index.js)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered! Scope: ', registration.scope);
        }).catch(err => {
          console.log('Service Worker registration failed: ', err);
        });
    });
  }
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <App />
    </Router>
);
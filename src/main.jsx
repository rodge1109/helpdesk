import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Keep-alive component to prevent Render from sleeping
function KeepAliveProvider() {
  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_URL ||
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000/api'
        : `${window.location.origin}/api`);
    
    // Ping keep-alive every 5 minutes
    const keepAliveInterval = setInterval(() => {
      fetch(`${API_BASE}/keep-alive`)
        .catch(err => console.warn('[Keep-Alive] Ping failed:', err));
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(keepAliveInterval);
  }, []);
  
  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KeepAliveProvider />
    <App />
  </StrictMode>,
)

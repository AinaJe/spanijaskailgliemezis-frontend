import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* AppProvider ietver visu lietojumprogrammu, lai nodrošinātu kontekstu */}
    <App />
  </StrictMode>,
);
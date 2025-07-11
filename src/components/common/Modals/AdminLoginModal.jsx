// src/components/common/Modals/AdminLoginModal.jsx
import React, { useState } from 'react';
import Modal from './Modal'; // Izmantojam jūsu esošo vispārīgo Modal komponenti
import './AdminLoginModal.css'; // Šo failu izveidosim nākamajā solī

const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Notīrīt iepriekšējās kļūdas

    // Šeit pašlaik ir simulēta pieteikšanās.
    // Kad jūsu CodeIgniter API būs gatavs, jums būs jāaizstāj šī simulācija ar reālu API izsaukumu.
    // Piemērs:
    // import config from '../../../config'; // Importēt API_BASE_URL
    // try {
    //   const response = await fetch(`${config.API_BASE_URL}/admin/login`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password }),
    //   });
    //   if (response.ok) {
    //     const data = await response.json();
    //     // Pieņemsim, ka API atgriež tokenu vai sesijas informāciju
    //     localStorage.setItem('adminToken', data.token); // Saglabāt tokenu
    //     onLoginSuccess();
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.message || 'Pieteikšanās neizdevās.');
    //   }
    // } catch (err) {
    //   setError('Kļūda, mēģinot pieslēgties serverim.');
    //   console.error('Login error:', err);
    // }

    // SIMULĀCIJA: Veiksmīga pieteikšanās ar lietotājvārdu 'admin' un paroli 'password123'
    if (username === 'admin' && password === 'password123') {
      setTimeout(() => { // Simulators, lai imitētu tīkla aizkavi
        onLoginSuccess();
      }, 500);
    } else {
      setError('Nepareizs lietotājvārds vai parole.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Administratora pieteikšanās">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <div className="form-group">
          <label htmlFor="adminUsername">Lietotājvārds:</label>
          <input
            type="text"
            id="adminUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            required
            autoComplete="username" // Atvieglina pārlūka aizpildi
          />
        </div>
        <div className="form-group">
          <label htmlFor="adminPassword">Parole:</label>
          <input
            type="password"
            id="adminPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
            autoComplete="current-password" // Atvieglina pārlūka aizpildi
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions" style={{ justifyContent: 'center' }}>
          <button type="submit" className="submit-button">Pieteikties</button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminLoginModal;
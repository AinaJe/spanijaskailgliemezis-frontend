// src/components/common/Modals/AdminLoginModal.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import './AdminLoginModal.css';

const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // JAUNS: Ielādes stāvoklis

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Sākam ielādi

    const result = await onLoginSuccess(username, password); // Izsaucam no Header/App padoto funkciju

    if (!result.success) {
      setError(result.message || 'Pieteikšanās neizdevās.');
    }
    setIsLoading(false); // Pabeidzam ielādi
    // onLoginSuccess (no props) jau apstrādā modālā loga aizvēršanu, ja veiksmīgi.
  };

  if (!isOpen) return null;

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
            autoComplete="username"
            disabled={isLoading} // Atspējo laukus, kamēr notiek ielāde
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
            autoComplete="current-password"
            disabled={isLoading} // Atspējo laukus, kamēr notiek ielāde
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions" style={{ justifyContent: 'center' }}>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Pieslēdzas...' : 'Pieteikties'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminLoginModal;
// src/components/common/Modals/InfoModal.jsx
import React from 'react';
import './Modal.css'; // Izmantojam tos pašus stilus

const InfoModal = ({ item, onClose, type }) => {
  if (!item) return null;

  const renderContent = () => {
    switch (type) {
      case 'autoru':
        return <p><strong>Vārds:</strong> {item.name}</p>;
      case 'tēmu':
        return (
          <>
            <p><strong>Nosaukums:</strong> {item.name}</p>
            <p><strong>Kopsavilkums:</strong> {item.summary}</p>
          </>
        );
      case 'rakstu':
        return (
          <>
            <p><strong>Nosaukums:</strong> {item.title}</p>
            <p><strong>Kopsavilkums:</strong> {item.summary}</p>
            <p><strong>Saite:</strong> <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
          </>
        );
      case 'video':
         return (
          <>
            <p><strong>Nosaukums:</strong> {item.title}</p>
            <p><strong>Kopsavilkums:</strong> {item.summary}</p>
            <p><strong>Saite:</strong> <a href={item.videoLink} target="_blank" rel="noopener noreferrer">{item.videoLink}</a></p>
          </>
        );
      default:
        return <p>Nezināms ieraksta veids.</p>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Skatīt ierakstu</h2>
        <div className="modal-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
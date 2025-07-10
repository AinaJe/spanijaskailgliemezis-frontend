// src/components/common/Modals/ConfirmDeleteModal.jsx
import React from 'react';
import Modal from './Modal';
// LABOJUMS: Pareizais ceļš uz CSS failu
import './CardDetailModal/CardDetailModal.css';

const ConfirmDeleteModal = ({ item, itemType, onClose, onConfirm }) => {
  if (!item) return null;

  const renderItemDetails = () => {
    switch (itemType) {
      case 'autoru':
        return <p><strong>Vārds:</strong> {item.name}</p>;
      case 'tēmu':
        return (
          <>
            <p><strong>Nosaukums:</strong> {item.name}</p>
            <p><strong>Kopsavilkums:</strong> {item.summary}</p>
          </>
        );
      default:
        return <p><strong>Nosaukums:</strong> {item.title}</p>;
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Apstiprināt dzēšanu">
      <div className="modal-body">
        <p>Vai tiešām vēlaties dzēst šo ierakstu?</p>
        <div className="item-to-delete-info">
          {renderItemDetails()}
        </div>
        <div className="card-detail-modal-actions">
          <button onClick={() => onConfirm(itemType, item.id)} className="action-button delete-button">
            Dzēst
          </button>
          <button onClick={onClose} className="action-button cancel-button">
            Atcelt
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
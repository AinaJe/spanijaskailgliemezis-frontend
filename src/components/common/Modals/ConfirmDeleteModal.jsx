// src/components/common/Modals/ConfirmDeleteModal.jsx
import React from 'react';
import Modal from './Modal';
import './CardDetailModal/CardDetailModal.css'; // Izmantojam tos pašus stilus pogām

const ConfirmDeleteModal = ({ item, itemType, onClose, onConfirm }) => {
  if (!item) return null;

  return (
    <Modal isOpen={true} onClose={onClose} title="Apstiprināt dzēšanu">
      <div className="modal-body">
        <p>Vai tiešām vēlaties dzēst šo ierakstu?</p>
        <div className="item-to-delete-info">
          <strong>{item.name || item.title}</strong>
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
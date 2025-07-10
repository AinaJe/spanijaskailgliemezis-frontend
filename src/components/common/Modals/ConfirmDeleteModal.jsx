// src/components/common/Modals/ConfirmDeleteModal.jsx
import React, { Suspense, lazy } from 'react';
import Modal from './Modal';
import './CardDetailModal/CardDetailModal.css';

const CardDetailModalContent = lazy(() => import('./CardDetailModalContent'));

const ConfirmDeleteModal = ({ item, itemType, onClose, onConfirm }) => {
  if (!item) return null;

  const renderItemDetails = () => {
    switch (itemType) {
      case 'kartīti':
        return (
          <Suspense fallback={<div>Ielādē...</div>}>
            <CardDetailModalContent card={item} />
          </Suspense>
        );
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
                {item.link && <p><strong>Saite:</strong> <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>}
            </>
        );
      case 'video':
        return (
            <>
                <p><strong>Nosaukums:</strong> {item.title}</p>
                {item.videoLink && <p><strong>Saite:</strong> <a href={item.videoLink} target="_blank" rel="noopener noreferrer">{item.videoLink}</a></p>}
            </>
        );
      default:
        return <p>Nezināms ieraksta veids.</p>;
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Apstiprināt dzēšanu">
      <div className="modal-body">
        <p>Vai tiešām vēlaties dzēst šo ierakstu?</p>
        <div className="item-to-delete-info" style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', marginTop: '10px', marginBottom: '20px' }}>
          {renderItemDetails()}
        </div>
        <div className="card-detail-modal-actions">
          <button onClick={() => onConfirm(itemType, item.id)} className="action-button delete-button">
            Jā, dzēst
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
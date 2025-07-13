// src/components/common/Modals/ConfirmDeleteModal.jsx
import React, { Suspense, lazy } from 'react';
import Modal from './Modal';
import './CardDetailModal/CardDetailModal.css';

const CardDetailModalContent = lazy(() => import('./CardDetailModal/CardDetailModalContent'));

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
        <div className="item-to-delete-info" style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', marginTop: '10px', marginBottom: '20px', maxHeight: '40vh', overflowY: 'auto' }}>
          {renderItemDetails()}
        </div>
        <div className="card-detail-modal-actions" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={() => onConfirm(itemType, item.id)} className="action-button" style={{ backgroundColor: 'var(--danger-color)', color: 'var(--white-color)', padding: '10px 20px', borderRadius: '5px', fontSize: '1em', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
            Jā, dzēst
          </button>
          <button type="button" onClick={onClose} className="action-button" style={{ backgroundColor: 'var(--grey-500)', color: 'var(--white-color)', padding: '10px 20px', borderRadius: '5px', fontSize: '1em', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
            Atcelt
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
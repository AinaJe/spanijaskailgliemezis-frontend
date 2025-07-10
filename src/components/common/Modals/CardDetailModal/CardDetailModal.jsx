// src/components/common/Modals/CardDetailModal/CardDetailModal.jsx
import React, { lazy, Suspense } from 'react';
import './CardDetailModal.css';

const CardDetailModalContent = lazy(() => import('./CardDetailModalContent'));

const CardDetailModal = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="card-detail-modal-overlay" onClick={onClose}>
      <div className="card-detail-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="card-detail-modal-close-button">&times;</button>
        <Suspense fallback={<div>Ielādē...</div>}>
          <CardDetailModalContent card={card} />
        </Suspense>
      </div>
    </div>
  );
};

export default CardDetailModal;
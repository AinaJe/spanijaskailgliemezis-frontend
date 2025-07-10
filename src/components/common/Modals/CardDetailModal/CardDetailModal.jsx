// src/components/common/Modals/CardDetailModal/CardDetailModal.jsx
import React, { Suspense } from 'react';
import Modal from '../Modal'; // Importējam universālo Modal komponenti
import CardDetailModalContent from './CardDetailModalContent';

const CardDetailModal = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <Modal isOpen={true} onClose={onClose}>
      <Suspense fallback={<div>Ielādē...</div>}>
        <CardDetailModalContent card={card} />
      </Suspense>
    </Modal>
  );
};

export default CardDetailModal;
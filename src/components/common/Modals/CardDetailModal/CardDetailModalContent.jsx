// src/components/common/Modals/CardDetailModal/CardDetailModalContent.jsx
import React, { Suspense } from 'react';
import ImageCarousel from '../../../cards/ImageCarousel/ImageCarousel';
import RichTextEditor from '../../RichTextEditor/RichTextEditor';
import './CardDetailModal.css';

const CardDetailModalContent = ({ card }) => {
  if (!card) return null;

  return (
    <>
      <h2>{card.title}</h2>
      
      <div className="card-detail-modal-meta">
        <span className="card-detail-modal-theme">{card.themeName || 'Nenorādīta'}</span>
        <span className="card-detail-modal-author">Autors: {card.authorName}</span>
      </div>

      {card.summary && <p className="card-detail-modal-summary">{card.summary}</p>}

      <div className="card-detail-content-section">
        <h3>Apraksts:</h3>
        <RichTextEditor content={card.description} onContentChange={null} />
      </div>

      {card.images && card.images.length > 0 && (
        <div className="card-detail-content-section">
            <Suspense fallback={<div>Ielādē attēlus...</div>}>
            <ImageCarousel images={card.images} availableAuthors={card.allAuthors} onImageClick={() => {}} />
            </Suspense>
        </div>
      )}
    </>
  );
};

export default CardDetailModalContent;
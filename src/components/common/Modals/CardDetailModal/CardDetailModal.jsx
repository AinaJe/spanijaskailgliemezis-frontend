// src/components/common/Modals/CardDetailModal/CardDetailModal.jsx
import React, { useState, lazy, Suspense } from 'react';
import './CardDetailModal.css';

const ImageCarousel = lazy(() => import('../../../cards/ImageCarousel/ImageCarousel'));
const ImageFullscreenModal = lazy(() => import('../ImageFullscreenModal/ImageFullscreenModal'));
import RichTextEditor from '../../RichTextEditor/RichTextEditor';

const CardDetailModal = ({ card, onClose, mode = 'view', onConfirmDelete }) => {
  const [fullscreenImage, setFullscreenImage] = useState(null);

  if (!card) {
    return null;
  }

  const authorName = card.authorName || 'Nezināms autors';
  const handleImageClick = (image) => setFullscreenImage(image);
  const handleCloseFullscreen = () => setFullscreenImage(null);

  return (
    <div className="card-detail-modal-overlay" onClick={onClose}>
      <div className="card-detail-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="card-detail-modal-close-button">&times;</button>

        <h2>{card.title}</h2>
        <p className="card-detail-modal-theme"><strong>Tēma:</strong> {card.themeName || card.theme}</p>
        <p className="card-detail-modal-author"><strong>Autors:</strong> {authorName}</p>
        {card.summary && <p className="card-detail-modal-summary">{card.summary}</p>}

        {card.images && card.images.length > 0 && (
          <Suspense fallback={<div>Ielādē attēlus...</div>}>
            <ImageCarousel images={card.images} availableAuthors={card.allAuthors} onImageClick={handleImageClick} />
          </Suspense>
        )}

        <div className="card-detail-content-section">
          <h3>Apraksts:</h3>
          <RichTextEditor content={card.description} onContentChange={null} />
        </div>

        {/* JAUNS: Pogas atkarībā no `mode` */}
        {mode === 'delete' && (
          <div className="card-detail-modal-actions">
            <button onClick={() => onConfirmDelete(card.id)} className="action-button delete-button">Apstiprināt dzēšanu</button>
            <button onClick={onClose} className="action-button cancel-button">Atcelt</button>
          </div>
        )}
      </div>

      {fullscreenImage && (
        <Suspense fallback={<div>Ielādē pilnekrāna attēlu...</div>}>
          <ImageFullscreenModal
            imageUrl={fullscreenImage.url}
            description={fullscreenImage.description}
            onClose={handleCloseFullscreen}
          />
        </Suspense>
      )}
    </div>
  );
};

export default CardDetailModal;
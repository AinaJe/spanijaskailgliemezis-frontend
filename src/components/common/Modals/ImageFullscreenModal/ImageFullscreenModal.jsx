// src/components/common/Modals/ImageFullscreenModal/ImageFullscreenModal.jsx
import React from 'react'; // Importējam React, jo izmantojam JSX
import './ImageFullscreenModal.css'; // Importējam šīs komponentes stilus

/**
 * Pilnekrāna attēla modālā loga komponente.
 * Attēlo attēlu pilnā ekrānā ar aprakstu.
 * @param {object} props - Komponentes props.
 * @param {string} props.imageUrl - Attēla URL.
 * @param {string} [props.description] - Attēla apraksts (nav obligāts).
 * @param {function} props.onClose - Funkcija, kas tiek izsaukta, lai aizvērtu modālo logu.
 */
const ImageFullscreenModal = ({ imageUrl, description, onClose }) => {
  // Ja attēla URL nav padots, nerādām neko
  if (!imageUrl) {
    return null;
  }

  return (
    // Pārklājums, kas aizver modālo logu, noklikšķinot ārpus attēla
    <div className="fullscreen-modal-overlay" onClick={onClose}>
      {/* Modālā loga saturs, kura klikšķi netiek izplatīti uz pārklājumu */}
      <div className="fullscreen-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Aizvēršanas poga */}
        <button className="fullscreen-modal-close-button" onClick={onClose} aria-label="Aizvērt pilnekrāna attēlu">
          &times; {/* HTML entītija reizes simbolam */}
        </button>
        {/* Attēls pilnekrāna režīmā */}
        <img
          src={imageUrl}
          alt={description || 'Pilnekrāna attēls'} // Alt teksts no apraksta vai noklusējuma
          className="fullscreen-modal-image"
        />
        {/* Attēla apraksts, ja tas ir pieejams */}
        {description && <p className="fullscreen-modal-description">{description}</p>}
      </div>
    </div>
  );
};

export default ImageFullscreenModal; // Eksportējam komponenti
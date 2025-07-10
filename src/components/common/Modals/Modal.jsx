// src/components/common/Modals/Modal.jsx
import React from 'react'; // Importējam React, jo izmantojam JSX
import './Modal.css'; // Importējam šīs komponentes stilus

/**
 * Vispārīga modālā loga komponente.
 * Parāda saturu virs citiem lapas elementiem.
 * @param {object} props - Komponentes props.
 * @param {boolean} props.isOpen - Vai modālais logs ir atvērts.
 * @param {function} props.onClose - Funkcija, kas tiek izsaukta, kad modālais logs tiek aizvērts.
 * @param {React.ReactNode} props.children - Modālā loga saturs.
 * @param {string} [props.title] - Modālā loga virsraksts (nav obligāts).
 */
const Modal = ({ isOpen, onClose, children, title }) => {
  // Ja modālais logs nav atvērts, nerādām neko
  if (!isOpen) {
    return null;
  }

  return (
    // Pārklājums, kas aizver modālo logu, noklikšķinot ārpus tā
    <div className="modal-overlay" onClick={onClose}>
      {/* Modālā loga saturs, kura klikšķi netiek izplatīti uz pārklājumu */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Aizvēršanas poga */}
        <button className="modal-close-button" onClick={onClose}>
          &times; {/* HTML entītija reizes simbolam */}
        </button>
        {/* Virsraksts, ja tas ir norādīts */}
        {title && <h2 className="modal-title">{title}</h2>}
        {/* Modālā loga galvenais saturs */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; // Eksportējam komponenti, lai to varētu izmantot citur
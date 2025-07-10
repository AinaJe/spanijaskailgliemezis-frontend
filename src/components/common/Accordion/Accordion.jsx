// src/components/common/Accordion/Accordion.jsx
import React from 'react'; // Importējam React, jo izmantojam JSX
import './Accordion.css'; // Importējam šīs komponentes stilus

/**
 * Accordion komponente.
 * Atļauj parādīt/paslēpt saturu ar klikšķi uz virsraksta.
 * @param {object} props - Komponentes props.
 * @param {string} props.title - Akordeona virsraksts.
 * @param {React.ReactNode} props.content - Akordeona saturs (jebkurš React elements).
 * @param {boolean} props.isOpen - Vai akordeons ir atvērts.
 * @param {function} props.onToggle - Funkcija, kas tiek izsaukta, kad akordeons tiek ieslēgts/izslēgts.
 */
const Accordion = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="accordion-item">
      <button className="accordion-button" onClick={onToggle} aria-expanded={isOpen}>
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion; // Eksportējam komponenti, lai to varētu izmantot citur
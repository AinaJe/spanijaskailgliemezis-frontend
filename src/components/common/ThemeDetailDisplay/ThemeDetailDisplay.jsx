// src/components/common/ThemeDetailDisplay/ThemeDetailDisplay.jsx
import React from 'react'; // Importējam React
import './ThemeDetailDisplay.css'; // Importējam šīs komponentes stilus
import RichTextEditor from '../RichTextEditor/RichTextEditor'; // Importējam RichTextEditor, lai attēlotu aprakstu

/**
 * Tēmas detalizētā displeja komponente.
 * Attēlo tēmas nosaukumu, kopsavilkumu un detalizētu aprakstu.
 * @param {object} props - Komponentes props.
 * @param {object} props.theme - Tēmas objekts ar nosaukumu, kopsavilkumu un aprakstu.
 */
const ThemeDetailDisplay = ({ theme }) => {
  // Ja tēmas objekts nav padots, nerādām neko
  if (!theme) {
    return null;
  }

  return (
    <div className="theme-detail-display-container">
      {/* Tēmas virsraksts */}
      <h3 className="theme-detail-title">{theme.name}</h3>
      {/* Tēmas kopsavilkums */}
      <p className="theme-detail-summary"><strong>{theme.summary}</strong></p>
      {/* Tēmas detalizētais apraksts, izmantojot RichTextEditor skatīšanās režīmā */}
      <div className="theme-detail-description">
        <RichTextEditor content={theme.description} onContentChange={null} />
      </div>
    </div>
  );
};

export default ThemeDetailDisplay; // Eksportējam komponenti
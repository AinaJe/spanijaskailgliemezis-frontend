// src/components/forms/AddThemeForm.jsx
import React, { useState } from 'react'; // Importējam React un useState hooku
import RichTextEditor from '../common/RichTextEditor/RichTextEditor'; // Importējam RichTextEditor komponenti
import './AddForm.css'; // Importējam kopējos formu stilus

/**
 * Tēmas pievienošanas forma.
 * Nodrošina formu jaunas tēmas nosaukuma, kopsavilkuma un apraksta ievadei.
 * @param {object} props - Komponentes props.
 * @param {function} props.onAddTheme - Funkcija, kas tiek izsaukta, kad tēma tiek pievienota.
 * @param {function} props.onClose - Funkcija, kas tiek izsaukta, lai aizvērtu formu (piem., modālo logu).
 */
const AddThemeForm = ({ onAddTheme, onClose }) => {
  // Stāvokļi formas laukiem
  const [themeName, setThemeName] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState(''); // Saturs no RichTextEditor

  // Funkcija, kas tiek izsaukta, iesniedzot formu
  const handleSubmit = (e) => {
    e.preventDefault(); // Novērš noklusējuma formas iesniegšanas uzvedību

    // Validācija: pārbaudām, vai visi obligātie lauki ir aizpildīti
    // RichTextEditor atgriež '<p></p>' tukša satura gadījumā, tāpēc pārbaudām arī to
    if (!themeName.trim() || !summary.trim() || !description.trim() || description.trim() === '<p></p>') {
      alert('Tēmas nosaukums, kopsavilkums un apraksts ir obligāti!');
      return; // Pārtraucam tālāku izpildi
    }

    // Izsaucam onAddTheme funkciju ar jaunās tēmas datiem
    onAddTheme({
      name: themeName.trim(),
      summary: summary.trim(),
      description: description.trim(),
    });

    // Notīrām formas laukus pēc iesniegšanas
    setThemeName('');
    setSummary('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      {/* Tēmas nosaukuma lauks */}
      <div className="form-group">
        <label htmlFor="themeName">Tēmas nosaukums:</label>
        <input
          type="text"
          id="themeName"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          placeholder="Ievadiet tēmas nosaukumu"
          className="form-control"
        />
      </div>
      {/* Tēmas kopsavilkuma lauks */}
      <div className="form-group">
        <label htmlFor="themeSummary">Kopsavilkums:</label>
        <textarea
          id="themeSummary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows="3"
          placeholder="Īss tēmas kopsavilkums"
          className="form-control"
        ></textarea>
      </div>
      {/* Tēmas apraksta lauks, izmantojot RichTextEditor */}
      <div className="form-group">
        <label htmlFor="themeDescription">Apraksts:</label>
        <RichTextEditor content={description} onContentChange={setDescription} />
      </div>
      <div className="form-actions">
        {/* Iesniegšanas poga */}
        <button type="submit" className="submit-button">Pievienot</button>
        {/* Atcelšanas poga, kas aizver formu */}
        <button type="button" onClick={onClose} className="cancel-button">Atcelt</button>
      </div>
    </form>
  );
};

export default AddThemeForm; // Eksportējam komponenti
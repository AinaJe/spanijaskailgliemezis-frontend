// src/components/forms/AddAuthorForm.jsx
import React, { useState } from 'react'; // Importējam React un useState hooku
import './AddForm.css'; // Importējam kopējos formu stilus

/**
 * Autoru pievienošanas forma.
 * Nodrošina vienkāršu formu jauna autora vārda ievadei.
 * @param {object} props - Komponentes props.
 * @param {function} props.onAddAuthor - Funkcija, kas tiek izsaukta, kad autors tiek pievienots.
 * @param {function} props.onClose - Funkcija, kas tiek izsaukta, lai aizvērtu formu (piem., modālo logu).
 */
const AddAuthorForm = ({ onAddAuthor, onClose }) => {
  // Stāvoklis jauna autora vārdam
  const [authorName, setAuthorName] = useState('');

  // Funkcija, kas tiek izsaukta, iesniedzot formu
  const handleSubmit = (e) => {
    e.preventDefault(); // Novērš noklusējuma formas iesniegšanas uzvedību (lapas pārlādēšanos)

    // Validācija: pārbaudām, vai autora vārds nav tukšs
    if (!authorName.trim()) {
      alert('Autora vārds ir obligāts!');
      return; // Pārtraucam tālāku izpildi, ja vārds ir tukšs
    }

    // Izsaucam onAddAuthor funkciju ar jauno autora vārdu
    onAddAuthor({ name: authorName.trim() });
    setAuthorName(''); // Notīrām ievades lauku pēc iesniegšanas
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-group">
        <label htmlFor="authorName">Autora vārds:</label>
        <input
          type="text"
          id="authorName"
          value={authorName} // Kontrolēta komponente: vērtība nāk no stāvokļa
          onChange={(e) => setAuthorName(e.target.value)} // Atjaunina stāvokli, kad vērtība mainās
          placeholder="Ievadiet jauna autora vārdu"
          className="form-control"
        />
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

export default AddAuthorForm; // Eksportējam komponenti
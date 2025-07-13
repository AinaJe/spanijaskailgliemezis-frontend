// src/components/forms/AddThemeForm.jsx
import React, { useState } from 'react';
import RichTextEditor from '../common/RichTextEditor/RichTextEditor';
import './AddForm.css';

const AddThemeForm = ({ onAddTheme, onClose }) => {
  const [themeName, setThemeName] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!themeName.trim() || !summary.trim() || !description.trim() || description.trim() === '<p></p>') {
      alert('Tēmas nosaukums, kopsavilkums un apraksts ir obligāti!');
      return;
    }

    try {
      await onAddTheme({
        name: themeName.trim(),
        summary: summary.trim(),
        description: description.trim(),
      });
      setThemeName('');
      setSummary('');
      setDescription('');
    } catch (error) {
      alert(`Kļūda, pievienojot tēmu: ${error.message}`);
      console.error('Add Theme Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
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
      <div className="form-group">
        <label htmlFor="themeDescription">Apraksts:</label>
        <RichTextEditor content={description} onContentChange={setDescription} />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">Pievienot</button>
        <button type="button" onClick={onClose} className="cancel-button">Atcelt</button>
      </div>
    </form>
  );
};

export default AddThemeForm;
// src/components/forms/EditThemeForm.jsx
import React, { useState, useEffect } from 'react';
import RichTextEditor from '../common/RichTextEditor/RichTextEditor';
import './AddForm.css';

const EditThemeForm = ({ onUpdateTheme, onClose, theme }) => {
  const [themeName, setThemeName] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (theme) {
      setThemeName(theme.name);
      setSummary(theme.summary);
      setDescription(theme.description);
    }
  }, [theme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!themeName.trim() || !summary.trim() || !description.trim() || description.trim() === '<p></p>') {
      alert('Visi lauki ir obligāti!');
      return;
    }
    try {
      await onUpdateTheme(theme.id, { 
        name: themeName.trim(),
        summary: summary.trim(),
        description: description.trim(),
      });
    } catch (error) {
      alert(`Kļūda, atjauninot tēmu: ${error.message}`);
      console.error('Edit Theme Error:', error);
    }
  };

  if (!theme) return null;

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-group">
        <label htmlFor="themeName">Tēmas nosaukums:</label>
        <input type="text" id="themeName" value={themeName} onChange={(e) => setThemeName(e.target.value)} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="themeSummary">Kopsavilkums:</label>
        <textarea id="themeSummary" value={summary} onChange={(e) => setSummary(e.target.value)} rows="3" className="form-control"></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="themeDescription">Apraksts:</label>
        <RichTextEditor content={description} onContentChange={setDescription} />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">Saglabāt</button>
        <button type="button" onClick={onClose} className="cancel-button">Atcelt</button>
      </div>
    </form>
  );
};

export default EditThemeForm;
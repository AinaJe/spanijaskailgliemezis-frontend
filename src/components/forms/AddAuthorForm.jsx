// src/components/forms/AddAuthorForm.jsx
import React, { useState } from 'react';
import './AddForm.css';

const AddAuthorForm = ({ onAddAuthor, onClose }) => {
  const [authorName, setAuthorName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authorName.trim()) {
      alert('Autora vārds ir obligāts!');
      return;
    }

    try {
      await onAddAuthor({ name: authorName.trim() });
      setAuthorName('');
    } catch (error) {
      alert(`Kļūda, pievienojot autoru: ${error.message}`);
      console.error('Add Author Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-group">
        <label htmlFor="authorName">Autora vārds:</label>
        <input
          type="text"
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Ievadiet jauna autora vārdu"
          className="form-control"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">Pievienot</button>
        <button type="button" onClick={onClose} className="cancel-button">Atcelt</button>
      </div>
    </form>
  );
};

export default AddAuthorForm;
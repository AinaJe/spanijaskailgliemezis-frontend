// src/components/forms/EditAuthorForm.jsx
import React, { useState, useEffect } from 'react';
import './AddForm.css'; // Mēs varam izmantot tos pašus stilus

const EditAuthorForm = ({ onUpdateAuthor, onClose, author }) => {
  const [authorName, setAuthorName] = useState('');

  // Iestatām sākotnējo vārdu, kad komponente tiek ielādēta
  useEffect(() => {
    if (author) {
      setAuthorName(author.name);
    }
  }, [author]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authorName.trim()) {
      alert('Autora vārds ir obligāts!');
      return;
    }
    // Izsaucam atjaunināšanas funkciju, padodot autora ID un jauno vārdu
    onUpdateAuthor(author.id, { name: authorName.trim() });
  };

  if (!author) return null; // Ja nav autora, neko nerādām

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
        <button type="submit" className="submit-button">Saglabāt</button>
        <button type="button" onClick={onClose} className="cancel-button">Atcelt</button>
      </div>
    </form>
  );
};

export default EditAuthorForm;
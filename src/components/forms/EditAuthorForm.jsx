// src/components/forms/EditAuthorForm.jsx
import React, { useState, useEffect } from 'react';
import './AddForm.css';

const EditAuthorForm = ({ onUpdateAuthor, onClose, author }) => {
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    if (author) {
      setAuthorName(author.name);
    }
  }, [author]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authorName.trim()) {
      alert('Autora vārds ir obligāts!');
      return;
    }
    try {
      await onUpdateAuthor(author.id, { name: authorName.trim() });
    } catch (error) {
      alert(`Kļūda, atjauninot autoru: ${error.message}`);
      console.error('Edit Author Error:', error);
    }
  };

  if (!author) return null;

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
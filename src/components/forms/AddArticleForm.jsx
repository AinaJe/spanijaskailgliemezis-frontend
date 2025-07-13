// src/components/forms/AddArticleForm.jsx
import React, { useState } from 'react';
import './AddForm.css';

const AddArticleForm = ({ onAddArticle, onClose, availableAuthors }) => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [link, setLink] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [isNewAuthorSelected, setIsNewAuthorSelected] = useState(false);

  const validateDate = (inputDate) => {
    const minDate = new Date('1950-01-01');
    const today = new Date();
    const selectedDate = new Date(inputDate);

    if (isNaN(selectedDate.getTime())) {
      return 'Nederīgs datuma formāts.';
    }
    if (selectedDate < minDate) {
      return 'Datums nevar būt senāks par 1950. gadu.';
    }
    if (selectedDate > today) {
      return 'Datums nevar būt nākotnē.';
    }
    return '';
  };

  const handleAuthorSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'new-author-option') {
      setIsNewAuthorSelected(true);
      setAuthorInput('');
    } else {
      setIsNewAuthorSelected(false);
      setAuthorInput(selectedValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateError = validateDate(date);
    if (dateError) {
      alert(dateError);
      return;
    }

    let finalAuthorIdToSend = '';
    if (isNewAuthorSelected) {
        if (!authorInput.trim()) {
            alert('Jauna autora vārds ir obligāts!');
            return;
        }
        finalAuthorIdToSend = `new-author-${authorInput.trim()}`;
    } else {
        if (!authorInput) {
            alert('Autors ir obligāts!');
            return;
        }
        finalAuthorIdToSend = authorInput;
    }

    if (!title.trim() || !finalAuthorIdToSend) {
      alert('Nosaukums un autors ir obligāti!');
      return;
    }

    try {
      await onAddArticle({
        date: date.trim(),
        title: title.trim(),
        summary: summary.trim(),
        link: link.trim(),
        authorId: finalAuthorIdToSend,
      });

      setDate('');
      setTitle('');
      setSummary('');
      setLink('');
      setAuthorInput('');
      setIsNewAuthorSelected(false);
    } catch (error) {
      alert(`Kļūda, pievienojot rakstu: ${error.message}`);
      console.error('Add Article Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-group">
        <label htmlFor="articleDate">Datums (YYYY-MM-DD):</label>
        <input
          type="date"
          id="articleDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
          min="1950-01-01"
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="form-group">
        <label htmlFor="articleTitle">Nosaukums:</label>
        <input
          type="text"
          id="articleTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ievadiet raksta nosaukumu"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="articleSummary">Kopsavilkums (nav obligāts):</label>
        <textarea
          id="articleSummary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows="2"
          placeholder="Īss raksta kopsavilkums"
          className="form-control"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="articleLink">Saite (nav obligāts):</label>
        <input
          type="url"
          id="articleLink"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://example.com/raksts"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="articleAuthor">Autors:</label>
        <select
          id="articleAuthor"
          value={isNewAuthorSelected ? 'new-author-option' : authorInput}
          onChange={handleAuthorSelectChange}
          className="form-control"
        >
          <option value="">-- Izvēlēties autoru --</option>
          {availableAuthors.map((author) => (
            <option key={author.id} value={author.id}>{author.name}</option>
          ))}
          <option value="new-author-option">Jauns autors...</option>
        </select>
        {isNewAuthorSelected && (
          <input
            type="text"
            id="newAuthorName"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            placeholder="Ievadiet jauna autora vārdu"
            className="form-control"
            style={{ marginTop: '10px' }}
          />
        )}
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">Pievienot</button>
        <button type="button" onClick={onClose} className="cancel-button">Atcelt</button>
      </div>
    </form>
  );
};

export default AddArticleForm;
// src/components/forms/EditArticleForm.jsx
import React, { useState, useEffect } from 'react'; // LABOTS: import sintakse
import './AddForm.css';

const EditArticleForm = ({ onUpdate, onClose, item, availableAuthors }) => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [link, setLink] = useState('');
  const [authorId, setAuthorId] = useState('');

  useEffect(() => {
    if (item) {
      setDate(item.date ? item.date.split('T')[0] : '');
      setTitle(item.title || '');
      setSummary(item.summary || '');
      setLink(item.link || '');
      setAuthorId(item.authorId || '');
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date.trim() || !title.trim() || !authorId) {
        alert('Datums, nosaukums un autors ir obligāti!');
        return;
    }

    try {
      await onUpdate('article', item.id, { date, title, summary, link, authorId });
      onClose();
    } catch (error) {
      alert(`Kļūda, atjauninot rakstu: ${error.message}`);
      console.error('Edit Article Error:', error);
    }
  };

  if (!item) return null;

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-group"><label>Datums:</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" /></div>
      <div className="form-group"><label>Nosaukums:</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" /></div>
      <div className="form-group"><label>Kopsavilkums:</label><textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows="3" className="form-control"></textarea></div>
      <div className="form-group"><label>Saite:</label><input type="url" value={link} onChange={(e) => setLink(e.target.value)} className="form-control" /></div>
      <div className="form-group">
        <label>Autors:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} className="form-control">
          <option value="">-- Izvēlēties autoru --</option>
          {availableAuthors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">Saglabāt</button>
        <button type="button" onClick={onClose} className="cancel-button">Atcelt</button>
      </div>
    </form>
  );
};

export default EditArticleForm;
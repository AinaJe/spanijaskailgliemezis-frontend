// src/components/forms/EditVideoForm.jsx
import React, { useState, useEffect } from 'react';
import RichTextEditor from '../common/RichTextEditor/RichTextEditor';
import './AddForm.css';

const EditVideoForm = ({ onUpdate, onClose, item, availableAuthors }) => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [description, setDescription] = useState('');
  const [authorId, setAuthorId] = useState('');

  useEffect(() => {
    if (item) {
      setDate(item.date ? item.date.split('T')[0] : '');
      setTitle(item.title || '');
      setSummary(item.summary || '');
      setVideoLink(item.videoLink || '');
      setDescription(item.description || '');
      setAuthorId(item.authorId || '');
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate('video', item.id, { date, title, summary, videoLink, description, authorId });
  };

  if (!item) return null;

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-group"><label>Datums:</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" /></div>
      <div className="form-group"><label>Nosaukums:</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" /></div>
      <div className="form-group"><label>Kopsavilkums:</label><textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows="2" className="form-control"></textarea></div>
      <div className="form-group"><label>Video saite:</label><input type="url" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} className="form-control" /></div>
      <div className="form-group"><label>Apraksts:</label><RichTextEditor content={description} onContentChange={setDescription} /></div>
      <div className="form-group">
        <label>Autors:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} className="form-control">
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

export default EditVideoForm;
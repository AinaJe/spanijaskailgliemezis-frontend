// src/components/forms/EditVideoForm.jsx
import React, { useState, useEffect } from 'react';
import RichTextEditor from '../common/RichTextEditor/RichTextEditor';
import './AddForm.css';

const EditVideoForm = ({ onUpdate, onClose, item, availableAuthors }) => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [sourceType, setSourceType] = useState('url');
  const [description, setDescription] = useState('');
  const [authorId, setAuthorId] = useState('');

  useEffect(() => {
    if (item) {
      setDate(item.date ? item.date.split('T')[0] : '');
      setTitle(item.title || '');
      setSummary(item.summary || '');
      setDescription(item.description || '');
      setAuthorId(item.authorId || '');

      if (item.videoLink && item.videoLink.startsWith('http')) {
        setSourceType('url');
        setVideoLink(item.videoLink);
        setVideoFile(null);
      } else {
        setSourceType('upload');
        setVideoLink('');
        setVideoFile(null);
      }
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date.trim() || !title.trim() || !description.trim() || description.trim() === '<p></p>' || !authorId) {
        alert('Lūdzu, aizpildiet visus obligātos laukus: Datums, Nosaukums, Apraksts un Autors.');
        return;
    }
    if (sourceType === 'url' && !videoLink.trim()) {
        alert('Video saite ir obligāta, ja izvēlēts URL tips!');
        return;
    }
    if (sourceType === 'upload' && !videoFile) {
        alert('Video fails ir obligāts, ja izvēlēts augšupielādes tips!');
        return;
    }

    const formData = new FormData();
    formData.append('date', date.trim());
    formData.append('title', title.trim());
    formData.append('summary', summary.trim());
    formData.append('description', description.trim());
    formData.append('authorId', authorId);
    formData.append('_method', 'PUT');

    if (sourceType === 'upload' && videoFile) {
        formData.append('videoFile', videoFile);
    } else if (sourceType === 'url' && videoLink.trim()) {
        formData.append('videoLink', videoLink.trim());
    } else {
        alert('Lūdzu, norādiet video saiti vai augšupielādējiet failu!');
        return;
    }

    try {
      await onUpdate('video', item.id, formData);
      onClose();
    } catch (error) {
      alert(`Kļūda, atjauninot video: ${error.message}`);
      console.error('Update Video Error:', error);
    }
  };

  const handleSourceTypeChange = (type) => {
    setSourceType(type);
    setVideoLink('');
    setVideoFile(null);
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    setVideoLink('');
  };

  if (!item) return null;

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-group"><label>Datums:</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" /></div>
      <div className="form-group"><label>Nosaukums:</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" /></div>
      <div className="form-group"><label>Kopsavilkums:</label><textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows="2" className="form-control"></textarea></div>
      
      <div className="form-group">
        <label>Video avots:</label>
        <div className="source-type-selector" style={{display: 'flex', gap: '15px', marginTop: '5px'}}>
          <label>
            <input
              type="radio"
              value="url"
              checked={sourceType === 'url'}
              onChange={() => handleSourceTypeChange('url')}
            />
            Video URL
          </label>
          <label>
            <input
              type="radio"
              value="upload"
              checked={sourceType === 'upload'}
              onChange={() => handleSourceTypeChange('upload')}
            />
            Augšupielādēt failu
          </label>
        </div>
      </div>

      {sourceType === 'url' ? (
        <div className="form-group">
          <label htmlFor="videoLink">Video saite:</label>
          <input
            type="url"
            id="videoLink"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
            className="form-control"
          />
        </div>
      ) : (
        <div className="form-group">
          <label htmlFor="videoFile">Video fails:</label>
          <input
            type="file"
            id="videoFile"
            onChange={handleVideoFileChange}
            className="form-control"
            accept="video/*"
            key={videoFile || "no-file-key"}
          />
        </div>
      )}

      <div className="form-group"><label>Apraksts:</label><RichTextEditor content={description} onContentChange={setDescription} /></div>
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

export default EditVideoForm;
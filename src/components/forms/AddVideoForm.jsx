// src/components/forms/AddVideoForm.jsx
import React, { useState } from 'react';
import RichTextEditor from '../common/RichTextEditor/RichTextEditor';
import './AddForm.css';

const AddVideoForm = ({ onAddVideo, onClose, availableAuthors }) => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [sourceType, setSourceType] = useState('url');
  const [description, setDescription] = useState('');

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

  const handleSourceTypeChange = (type) => {
    setSourceType(type);
    setVideoLink('');
    setVideoFile(null);
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    setVideoLink('');
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

    const formData = new FormData();
    formData.append('date', date.trim());
    formData.append('title', title.trim());
    formData.append('summary', summary.trim());
    formData.append('description', description.trim());
    formData.append('authorId', finalAuthorIdToSend);

    let isVideoSourceProvided = false;
    if (sourceType === 'url') {
      if (!videoLink.trim()) {
        alert('Video saite ir obligāta, ja izvēlēts URL tips!');
        return;
      }
      formData.append('videoLink', videoLink.trim());
      isVideoSourceProvided = true;
    } else { // sourceType === 'upload'
      if (!videoFile) {
        alert('Video fails ir obligāts, ja izvēlēts augšupielādes tips!');
        return;
      }
      formData.append('videoFile', videoFile);
      isVideoSourceProvided = true;
    }

    if (!title.trim() || !finalAuthorIdToSend || !isVideoSourceProvided || description.trim() === '' || description.trim() === '<p></p>') {
      alert('Nosaukums, autors, apraksts un video avots ir obligāti!');
      return;
    }

    try {
      await onAddVideo(formData);
      
      setDate('');
      setTitle('');
      setSummary('');
      setVideoLink('');
      setVideoFile(null);
      setSourceType('url');
      setDescription('');
      setAuthorInput('');
      setIsNewAuthorSelected(false);

    } catch (error) {
      alert(`Kļūda, pievienojot video: ${error.message}`);
      console.error('Add Video Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-group">
        <label htmlFor="videoDate">Datums (YYYY-MM-DD):</label>
        <input
          type="date"
          id="videoDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
          min="1950-01-01"
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="form-group">
        <label htmlFor="videoTitle">Nosaukums:</label>
        <input
          type="text"
          id="videoTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ievadiet video nosaukumu"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="videoSummary">Kopsavilkums (nav obligāts):</label>
        <textarea
          id="videoSummary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows="2"
          placeholder="Īss video kopsavilkums"
          className="form-control"
        ></textarea>
      </div>

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

      <div className="form-group">
        <label htmlFor="videoDescription">Apraksts:</label>
        <RichTextEditor content={description} onContentChange={setDescription} />
      </div>
      <div className="form-group">
        <label htmlFor="videoAuthor">Autors:</label>
        <select
          id="videoAuthor"
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

export default AddVideoForm;
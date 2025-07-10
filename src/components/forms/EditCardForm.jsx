// src/components/forms/EditCardForm.jsx
import React, { useState, useEffect } from 'react';
import RichTextEditor from '../common/RichTextEditor/RichTextEditor';
import CardFormImageSection from './CardForm/CardFormImageSection';
import './CardForm/CardForm.css';

const EditCardForm = ({ card, onUpdateCard, availableThemes, availableAuthors, onClose }) => {
  const [activeTab, setActiveTab] = useState('theme');
  
  const [themeId, setThemeId] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [cardAuthorId, setCardAuthorId] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (card) {
      setThemeId(card.theme);
      setTitle(card.title);
      setSummary(card.summary);
      setDescription(card.description);
      setCardAuthorId(card.authorId);
      setImages(card.images.map(img => ({...img, id: img.id || Date.now(), sourceType: 'url', file: null, newImageAuthorNameInput: ''})));
    }
  }, [card]);

  const handleImageChange = (index, field, value) => {
    const newImages = [...images];
    newImages[index][field] = value;
    setImages(newImages);
  };

  const handleImageFileChange = (index, file) => {
    const newImages = [...images];
    if (newImages[index].file && newImages[index].url) {
      URL.revokeObjectURL(newImages[index].url);
    }
    newImages[index].file = file;
    newImages[index].url = file ? URL.createObjectURL(file) : '';
    newImages[index].sourceType = 'upload';
    setImages(newImages);
  };

  const handleImageSourceTypeChange = (index, type) => {
    const newImages = [...images];
    if (newImages[index].file && newImages[index].url) {
      URL.revokeObjectURL(newImages[index].url);
    }
    newImages[index].sourceType = type;
    newImages[index].url = '';
    newImages[index].file = null;
    setImages(newImages);
  };

  const handleAddImage = () => {
    setImages([...images, { id: Date.now(), url: '', description: '', authorId: '', newImageAuthorNameInput: '', sourceType: 'url', file: null }]);
  };

  const handleRemoveImage = (index) => {
    if (images[index].file && images[index].url) {
      URL.revokeObjectURL(images[index].url);
    }
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

    const handleImageAuthorSelectChange = (index, e) => {
      const newImages = [...images];
      const selectedValue = e.target.value;
      if (selectedValue === `new-author-${index}`) {
          newImages[index].authorId = selectedValue;
          newImages[index].newImageAuthorNameInput = '';
      } else {
          newImages[index].authorId = selectedValue;
          newImages[index].newImageAuthorNameInput = '';
      }
      setImages(newImages);
  };

  const handleNewImageAuthorNameInputChange = (index, e) => {
      const newImages = [...images];
      newImages[index].newImageAuthorNameInput = e.target.value;
      setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onUpdateCard(card.id, {
      theme: themeId,
      title,
      summary,
      description,
      authorId: cardAuthorId,
      images,
    });
    onClose();
  };
  
  if (!card) return null;

  return (
    <div className="card-form-container">
      <h2 className="card-form-title">Rediģēt kartīti</h2>
      <form onSubmit={handleSubmit}>
        <div className="tab-navigation">
          <button type="button" className={`tab-button ${activeTab === 'theme' ? 'active' : ''}`} onClick={() => setActiveTab('theme')}>Tēma</button>
          <button type="button" className={`tab-button ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Pamatinformācija</button>
          <button type="button" className={`tab-button ${activeTab === 'images' ? 'active' : ''}`} onClick={() => setActiveTab('images')}>Attēlu slaidrāde</button>
        </div>
        <div className="tab-content">
          {activeTab === 'theme' && (
             <div className="tab-pane">
                <div className="card-form-group">
                    <label htmlFor="theme-select" className="card-form-label">Tēma:</label>
                    <select id="theme-select" value={themeId} onChange={(e) => setThemeId(parseInt(e.target.value, 10))} className="card-form-select">
                        <option value="">-- Izvēlēties tēmu --</option>
                        {availableThemes.filter(t => t.id !== 'all').map((theme) => <option key={theme.id} value={theme.id}>{theme.name}</option>)}
                    </select>
                </div>
             </div>
          )}
          {activeTab === 'info' && (
            <div className="tab-pane">
              <div className="card-form-group">
                <label htmlFor="author-select" className="card-form-label">Autors:</label>
                <select id="author-select" value={cardAuthorId} onChange={(e) => setCardAuthorId(parseInt(e.target.value, 10))} className="card-form-select">
                  <option value="">-- Izvēlēties autoru --</option>
                  {availableAuthors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}
                </select>
              </div>
              <div className="card-form-group"><label htmlFor="title" className="card-form-label">Nosaukums:</label><input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="card-form-input" /></div>
              <div className="card-form-group"><label htmlFor="summary" className="card-form-label">Kopsavilkums:</label><textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} rows="3" className="card-form-textarea"></textarea></div>
              <div className="form-group"><label htmlFor="description" className="card-form-label">Apraksts:</label><RichTextEditor content={description} onContentChange={setDescription} /></div>
            </div>
          )}
          {activeTab === 'images' && (
            <div className="tab-pane">
              <CardFormImageSection 
                images={images} 
                onImageChange={handleImageChange} 
                onImageFileChange={handleImageFileChange} 
                onImageSourceTypeChange={handleImageSourceTypeChange} 
                handleAddImage={handleAddImage} 
                handleRemoveImage={handleRemoveImage}
                handleImageAuthorSelectChange={handleImageAuthorSelectChange} 
                handleNewImageAuthorNameInputChange={handleNewImageAuthorNameInputChange} 
                availableAuthors={availableAuthors} 
              />
            </div>
          )}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px'}}>
            <button type="submit" className="card-form-submit-button">Saglabāt izmaiņas</button>
            <button type="button" onClick={onClose} className="card-form-submit-button" style={{backgroundColor: '#6c757d'}}>Atcelt</button>
        </div>
      </form>
    </div>
  );
};

export default EditCardForm;
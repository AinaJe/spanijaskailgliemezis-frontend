// src/components/forms/EditCardForm.jsx
import React, { useState, useEffect } from 'react';
import RichTextEditor from '../common/RichTextEditor/RichTextEditor';
import CardFormImageSection from './CardForm/CardFormImageSection';
import './CardForm/CardForm.css';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
      setImages(card.images.map(img => ({
          ...img,
          id: img.id || Date.now(),
          sourceType: 'url',
          file: null,
          newImageAuthorNameInput: ''
      })));
    }
  }, [card]);

  const handleImageOrderChange = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

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
      if (String(selectedValue).startsWith('new-author-')) {
          newImages[index].authorId = selectedValue;
          newImages[index].newImageAuthorNameInput = '';
      } else {
          newImages[index].authorId = parseInt(selectedValue, 10);
          newImages[index].newImageAuthorNameInput = '';
      }
      setImages(newImages);
  };

  const handleNewImageAuthorNameInputChange = (index, e) => {
      const newImages = [...images];
      newImages[index].newImageAuthorNameInput = e.target.value;
      setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!themeId || !title.trim() || !summary.trim() || !description.trim() || description.trim() === '<p></p>' || !cardAuthorId) {
      alert('Lūdzu, aizpildiet visus obligātos laukus: Tēma, Nosaukums, Kopsavilkums, Apraksts un Autors.');
      return;
    }

    const imagesToSubmit = [];
    for (const img of images) {
        if (img.url.trim() === '' && !img.file && img.description.trim() === '' && (img.authorId === '' || img.authorId === null)) {
            continue;
        }

        if (String(img.authorId).startsWith('new-author-') && !img.newImageAuthorNameInput.trim()) {
            alert('Lūdzu, ievadiet jauna attēla autora vārdu.');
            return;
        }

        if ((img.url.trim() !== '' || img.file) && img.description.trim() === '') {
            alert('Ja ir attēls (URL vai fails), ir jānorāda attēla apraksts.');
            return;
        }
        if ((img.url.trim() !== '' || img.file) && (img.authorId === '' || img.authorId === null)) {
            alert('Ja ir attēls (URL vai fails), ir jānorādīta attēla autors.');
            return;
        }

        imagesToSubmit.push(img);
    }

    if (imagesToSubmit.length === 0) {
        alert('Lūdzu, pievienojiet vismaz vienu attēlu kartītei.');
        return;
    }

    const formData = new FormData();
    formData.append('theme', themeId);
    formData.append('title', title.trim());
    formData.append('summary', summary.trim());
    formData.append('description', description.trim());
    formData.append('authorId', cardAuthorId);
    formData.append('_method', 'PUT');

    imagesToSubmit.forEach((img, index) => {
        let finalImageAuthorId = img.authorId;
        if (String(img.authorId).startsWith('new-author-')) {
            finalImageAuthorId = `new-author-${img.newImageAuthorNameInput.trim()}`;
        }

        if (img.sourceType === 'upload' && img.file) {
            formData.append(`images[${index}][file]`, img.file);
        } else {
            formData.append(`images[${index}][url]`, img.url.trim());
        }

        formData.append(`images[${index}][description]`, img.description.trim());
        formData.append(`images[${index}][authorId]`, finalImageAuthorId);
        formData.append(`images[${index}][order_index]`, index);
    });

    try {
      await onUpdateCard(card.id, formData);
      onClose();
    } catch (error) {
      alert(`Kļūda, atjauninot kartīti: ${error.message}`);
      console.error('Update Card Error:', error);
    }
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
            <DndContext collisionDetection={closestCenter} onDragEnd={handleImageOrderChange}>
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
            </DndContext>
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
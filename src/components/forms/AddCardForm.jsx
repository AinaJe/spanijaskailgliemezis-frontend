// src/components/forms/AddCardForm.jsx
import React, { useState } from 'react';
import RichTextEditor from '../common/RichTextEditor/RichTextEditor';
import CardFormImageSection from './CardForm/CardFormImageSection';
import './CardForm/CardForm.css';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

const AddCardForm = ({ onAddCard, availableThemes, availableAuthors }) => {
  const [activeTab, setActiveTab] = useState('theme');
  const [theme, setTheme] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [cardAuthorId, setCardAuthorId] = useState('');
  // Sākotnēji viena attēla rinda
  const [images, setImages] = useState([{ id: Date.now(), url: '', description: '', authorId: '', newImageAuthorNameInput: '', sourceType: 'url', file: null }]);

  // Funkcija attēlu secības maiņai
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

  // Funkcijas attēla lauku izmaiņām
  const handleImageChange = (index, field, value) => {
    const newImages = [...images];
    newImages[index][field] = value;
    setImages(newImages);
  };

  // Funkcija attēla faila izmaiņām (augšupielāde)
  const handleImageFileChange = (index, file) => {
    const newImages = [...images];
    // Atbrīvo veco URL, ja tas bija Object URL
    if (newImages[index].file && newImages[index].url) {
      URL.revokeObjectURL(newImages[index].url);
    }
    newImages[index].file = file; // Saglabā failu objektu
    newImages[index].url = file ? URL.createObjectURL(file) : ''; // Izveido pagaidu URL priekšskatījumam
    newImages[index].sourceType = 'upload'; // Iestata avota tipu
    setImages(newImages);
  };

  // Funkcija attēla avota tipa maiņai (URL vs Fails)
  const handleImageSourceTypeChange = (index, type) => {
    const newImages = [...images];
    if (newImages[index].file && newImages[index].url) {
      URL.revokeObjectURL(newImages[index].url);
    }
    newImages[index].sourceType = type;
    newImages[index].url = ''; // Notīra URL
    newImages[index].file = null; // Notīra failu
    setImages(newImages);
  };

  // Funkcija jauna attēla lauka pievienošanai
  const handleAddImage = () => {
    setImages([...images, { id: Date.now(), url: '', description: '', authorId: '', newImageAuthorNameInput: '', sourceType: 'url', file: null }]);
  };

  // Funkcija attēla lauka noņemšanai
  const handleRemoveImage = (index) => {
    if (images[index].file && images[index].url) {
      URL.revokeObjectURL(images[index].url);
    }
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // Funkcija attēla autora izvēlei (esošais vai jauns)
    const handleImageAuthorSelectChange = (index, e) => {
      const newImages = [...images];
      const selectedValue = e.target.value;
      if (String(selectedValue).startsWith('new-author-')) { // Ja izvēlēts jauns autors variants
          newImages[index].authorId = selectedValue; // Pagaidu vērtība (piem., "new-author-index")
          newImages[index].newImageAuthorNameInput = ''; // Notīra jauna autora vārdu
      } else {
          newImages[index].authorId = parseInt(selectedValue, 10); // Esošā autora ID
          newImages[index].newImageAuthorNameInput = ''; // Notīra jauna autora vārdu
      }
      setImages(newImages);
  };

  // Funkcija jauna attēla autora vārda ievadei
  const handleNewImageAuthorNameInputChange = (index, e) => {
      const newImages = [...images];
      newImages[index].newImageAuthorNameInput = e.target.value;
      setImages(newImages);
  };

  // Formas iesniegšanas funkcija
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validācija obligātajiem laukiem
    if (!theme || !title.trim() || !summary.trim() || !description.trim() || description.trim() === '<p></p>' || !cardAuthorId) {
      alert('Lūdzu, aizpildiet visus obligātos laukus: Tēma, Nosaukums, Kopsavilkums, Apraksts un Autors.');
      return;
    }

    // Pārbaudām, vai attēli ir aizpildīti konsekventi
    const imagesToSubmit = [];
    for (const img of images) {
        // Ja visi attēla lauki ir tukši, ignorējam to
        if (img.url.trim() === '' && !img.file && img.description.trim() === '' && (img.authorId === '' || img.authorId === null)) {
            continue;
        }

        // Validējam attēla autoru, ja izvēlēts "jauns autors" un vārds ir tukšs
        if (String(img.authorId).startsWith('new-author-') && !img.newImageAuthorNameInput.trim()) {
            alert('Lūdzu, ievadiet jauna attēla autora vārdu.');
            return;
        }

        // Validējam, vai, ja ir attēls (URL vai fails), ir arī apraksts un autors
        if ((img.url.trim() !== '' || img.file) && img.description.trim() === '') {
            alert('Ja ir attēls (URL vai fails), ir jānorāda attēla apraksts.');
            return;
        }
        if ((img.url.trim() !== '' || img.file) && (img.authorId === '' || img.authorId === null)) {
            alert('Ja ir attēls (URL vai fails), ir jānorādīta attēla autors.');
            return;
        }
        
        imagesToSubmit.push(img); // Pievienojam apstrādei, ja validācija veiksmīga
    }

    // Pārbaudām, vai ir vismaz viens attēls (ja tas ir obligāts priekš kartītēm)
    if (imagesToSubmit.length === 0) {
        alert('Lūdzu, pievienojiet vismaz vienu attēlu kartītei.');
        return;
    }

    const formData = new FormData(); // JAUNS: Izveidojam FormData objektu failu augšupielādei
    formData.append('theme', theme); // theme_id
    formData.append('title', title.trim());
    formData.append('summary', summary.trim());
    formData.append('description', description.trim());

    // Apstrādājam kartītes autoru
    let finalCardAuthorId = cardAuthorId;
    if (String(cardAuthorId).startsWith('new-author-')) {
        const newAuthorName = availableAuthors.find(a => String(a.id) === cardAuthorId.substring('new-author-'.length))?.name;
        finalCardAuthorId = `new-author-${newAuthorName.trim()}`;
    }
    formData.append('authorId', finalCardAuthorId);

    // Apstrādājam attēlus un pievienojam tos FormData
    const imagesMetaData = [];
    imagesToSubmit.forEach((img, index) => {
        let finalImageAuthorId = img.authorId;
        if (String(img.authorId).startsWith('new-author-')) {
            finalImageAuthorId = `new-author-${img.newImageAuthorNameInput.trim()}`;
        }

        if (img.sourceType === 'upload' && img.file) {
            formData.append(`images[${index}][file]`, img.file); // Pievienojam faktisko failu
        } else {
            formData.append(`images[${index}][url]`, img.url.trim()); // Pievienojam URL
        }

        // Pievienojam metadatus atsevišķi, lai bekends tos varētu nolasīt
        formData.append(`images[${index}][description]`, img.description.trim());
        formData.append(`images[${index}][authorId]`, finalImageAuthorId);
        formData.append(`images[${index}][order_index]`, index); // Saglabājam secību
    });

    try {
      // Izsaucam onAddCard funkciju ar FormData objektu
      await onAddCard(formData); // onAddCard nāk no App.jsx un izsauc api.createCard

      // Notīrām formas laukus pēc iesniegšanas
      setTheme('');
      setTitle('');
      setSummary('');
      setDescription('');
      setCardAuthorId('');
      setImages([{ id: Date.now(), url: '', description: '', authorId: '', newImageAuthorNameInput: '', sourceType: 'url', file: null }]);
      setActiveTab('theme');

    } catch (error) {
      alert(`Kļūda, pievienojot kartīti: ${error.message}`);
      console.error('Add Card Error:', error);
    }
  };

  return (
    <div className="card-form-container">
      <h2 className="card-form-title">Izveidot jaunu kartīti</h2>
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
                <select id="theme-select" value={theme} onChange={(e) => setTheme(e.target.value)} className="card-form-select">
                  <option value="">-- Izvēlēties tēmu --</option>
                  {availableThemes.map((theme) => <option key={theme.id} value={theme.id}>{theme.name}</option>)}
                </select>
              </div>
            </div>
          )}
          {activeTab === 'info' && (
            <div className="tab-pane">
              <div className="card-form-group">
                <label htmlFor="author-select" className="card-form-label">Autors:</label>
                <select id="author-select" value={cardAuthorId} onChange={(e) => setCardAuthorId(e.target.value)} className="card-form-select">
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
        <button type="submit" className="card-form-submit-button">Izveidot kartīti</button>
      </form>
    </div>
  );
};

export default AddCardForm;
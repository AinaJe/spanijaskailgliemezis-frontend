// src/components/forms/CardForm/CardForm.jsx
import React, { useState } from 'react';
import RichTextEditor from '../../common/RichTextEditor/RichTextEditor';
import CardFormImageSection from './CardFormImageSection';
import './CardForm.css';

const CardForm = ({ onAddCard, availableThemes, availableAuthors, allowHomepageTheme = false }) => {
  const [activeTab, setActiveTab] = useState('theme');
  const [theme, setTheme] = useState('');
  const [newThemeInput, setNewThemeInput] = useState('');
  const [isNewThemeSelected, setIsNewThemeSelected] = useState(false);
  const [newThemeSummary, setNewThemeSummary] = useState('');
  const [newThemeDescription, setNewThemeDescription] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [cardAuthorId, setCardAuthorId] = useState('');
  const [newCardAuthorName, setNewCardAuthorName] = useState('');
  const [isNewCardAuthorSelected, setIsNewCardAuthorSelected] = useState(false);
  const [images, setImages] = useState([{ id: Date.now(), url: '', description: '', authorId: '', newImageAuthorNameInput: '', sourceType: 'url', file: null }]);

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

  const handleThemeChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'new-theme-option') {
      setIsNewThemeSelected(true);
      setTheme('');
      setNewThemeSummary('');
      setNewThemeDescription('');
    } else {
      setIsNewThemeSelected(false);
      setNewThemeInput('');
      setNewThemeSummary('');
      setNewThemeDescription('');
      setTheme(selectedValue);
    }
  };

  const handleCardAuthorChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'new-author-option') {
      setIsNewCardAuthorSelected(true);
      setCardAuthorId('');
      setNewCardAuthorName('');
    } else {
      setIsNewCardAuthorSelected(false);
      setCardAuthorId(selectedValue);
      setNewCardAuthorName('');
    }
  };

  const handleDescriptionChange = (newDescription) => setDescription(newDescription);
  const handleNewThemeDescriptionChange = (newDesc) => setNewThemeDescription(newDesc);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCardAuthorId = isNewCardAuthorSelected ? `new-author-${newCardAuthorName.trim()}` : cardAuthorId;

    if ((!isNewThemeSelected && !theme.trim()) ||
        (isNewThemeSelected && !newThemeInput.trim()) ||
        !title.trim() || !summary.trim() ||
        !description.trim() || description.trim() === '<p></p>' ||
        !finalCardAuthorId || (isNewCardAuthorSelected && !newCardAuthorName.trim()) ||
        (isNewThemeSelected && (!newThemeSummary.trim() || !newThemeDescription.trim() || newThemeDescription.trim() === '<p></p>'))) {
      alert('Lūdzu, aizpildiet visus obligātos laukus visās cilnēs: Tēma, Nosaukums, Kopsavilkums, Apraksts un Autors. Ja pievienojat jaunu tēmu vai autoru, aizpildiet arī to informāciju.');
      return;
    }

    const imagesToSubmit = [];
    for (const img of images) {
        if (img.url.trim() === '' && !img.file && img.description.trim() === '' && img.authorId === '') {
            continue;
        }

        if (img.authorId && String(img.authorId).startsWith('new-author-') && !img.newImageAuthorNameInput.trim()) {
            alert('Lūdzu, ievadiet jauna attēla autora vārdu.');
            return;
        }

        if ((img.description.trim() !== '' || img.authorId !== '') && img.url.trim() === '' && !img.file) {
            alert('Ja ir attēla apraksts vai autors, ir jānorāda attēla URL vai jāaugšupielādē fails.');
            return;
        }
        if ((img.url.trim() !== '' || img.file) && img.description.trim() === '') {
            alert('Ja ir attēls (URL vai fails), ir jānorāda attēla apraksts.');
            return;
        }
        if ((img.url.trim() !== '' || img.file) && img.authorId === '') {
            alert('Ja ir attēls (URL vai fails), ir jānorādīta attēla autors.');
            return;
        }

        let finalImageAuthorId = img.authorId;
        if (img.authorId && String(img.authorId).startsWith('new-author-')) {
            finalImageAuthorId = `new-author-${img.newImageAuthorNameInput.trim()}`;
        }
        
        imagesToSubmit.push({ ...img, authorId: finalImageAuthorId });
    }

    const processedImages = await Promise.all(imagesToSubmit.map(async (img) => {
        if (img.sourceType === 'upload' && img.file) {
            console.log(`Simulē faila augšupielādi: ${img.file.name}`);
            const simulatedUrl = `/uploads/${img.file.name}`;
            return { url: simulatedUrl, description: img.description, authorId: img.authorId };
        }
        return { url: img.url, description: img.description, authorId: img.authorId };
    }));

    onAddCard({
      theme: isNewThemeSelected ? newThemeInput.trim() : theme.trim(),
      title,
      summary,
      description,
      images: processedImages,
      authorId: finalCardAuthorId,
      isNewTheme: isNewThemeSelected,
      newThemeName: isNewThemeSelected ? newThemeInput.trim() : null,
      newThemeSummary: isNewThemeSelected ? newThemeSummary.trim() : null,
      newThemeDescription: isNewThemeSelected ? newThemeDescription : null
    });

    setTheme('');
    setNewThemeInput('');
    setIsNewThemeSelected(false);
    setNewThemeSummary('');
    setNewThemeDescription('');
    setTitle('');
    setSummary('');
    setCardAuthorId('');
    setNewCardAuthorName('');
    setIsNewCardAuthorSelected(false);
    setImages([{ id: Date.now(), url: '', description: '', authorId: '', newImageAuthorNameInput: '', sourceType: 'url', file: null }]);
    setActiveTab('theme');
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
                <select id="theme-select" value={isNewThemeSelected ? 'new-theme-option' : theme} onChange={handleThemeChange} className="card-form-select">
                  <option value="">-- Izvēlēties tēmu --</option>
                  {/* LABOJUMS: Nodrošinām unikālas atslēgas */}
                  {availableThemes.map((t, index) => <option key={`${t}-${index}`} value={t}>{t}</option>)}
                  {allowHomepageTheme && <option key="sākums" value="Sākums">Sākums</option>}
                  <option key="new-theme" value="new-theme-option">Cita tēma / Jauna tēma</option>
                </select>
                {isNewThemeSelected && (
                  <>
                    <input type="text" id="new-theme-input" value={newThemeInput} onChange={(e) => setNewThemeInput(e.target.value)} placeholder="Ievadiet jaunu tēmu" className="card-form-input new-theme" />
                    <label htmlFor="new-theme-summary" className="card-form-label">Jaunās tēmas kopsavilkums:</label>
                    <textarea id="new-theme-summary" value={newThemeSummary} onChange={(e) => setNewThemeSummary(e.target.value)} rows="2" placeholder="Īss kopsavilkums jaunajai tēmai" className="card-form-textarea"></textarea>
                    <label htmlFor="new-theme-description" className="card-form-label">Jaunās tēmas apraksts:</label>
                    <RichTextEditor content={newThemeDescription} onContentChange={handleNewThemeDescriptionChange} />
                  </>
                )}
              </div>
            </div>
          )}
          {activeTab === 'info' && (
            <div className="tab-pane">
              <div className="card-form-group">
                <label htmlFor="author-select" className="card-form-label">Autors:</label>
                <select id="author-select" value={isNewCardAuthorSelected ? 'new-author-option' : cardAuthorId} onChange={handleCardAuthorChange} className="card-form-select">
                  <option value="">-- Izvēlēties autoru --</option>
                  {availableAuthors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}
                  <option value="new-author-option">Jauns autors</option>
                </select>
                {isNewCardAuthorSelected && (<input type="text" id="new-author-input" value={newCardAuthorName} onChange={(e) => setNewCardAuthorName(e.target.value)} placeholder="Ievadiet jauna autora vārdu" className="card-form-input new-theme" />)}
              </div>
              <div className="card-form-group"><label htmlFor="title" className="card-form-label">Nosaukums:</label><input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="card-form-input" /></div>
              <div className="card-form-group"><label htmlFor="summary" className="card-form-label">Kopsavilkums:</label><textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} rows="3" className="card-form-textarea"></textarea></div>
              <div className="form-group"><label htmlFor="description" className="card-form-label">Apraksts:</label><RichTextEditor content={description} onContentChange={handleDescriptionChange} /></div>
            </div>
          )}
          {activeTab === 'images' && (
            <div className="tab-pane">
              <CardFormImageSection images={images} onImageChange={handleImageChange} onImageFileChange={handleImageFileChange} onImageSourceTypeChange={handleImageSourceTypeChange} handleAddImage={handleAddImage} handleRemoveImage={handleRemoveImage} handleImageAuthorSelectChange={handleImageAuthorSelectChange} handleNewImageAuthorNameInputChange={handleNewImageAuthorNameInputChange} availableAuthors={availableAuthors} />
            </div>
          )}
        </div>
        <button type="submit" className="card-form-submit-button">Izveidot kartīti</button>
      </form>
    </div>
  );
};

export default CardForm;
// src/components/forms/CardForm/CardFormImageSection.jsx
import React from 'react';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

const SortableImageItem = ({ image, index, images, onImageChange, onImageFileChange, onImageSourceTypeChange, handleRemoveImage, handleImageAuthorSelectChange, handleNewImageAuthorNameInputChange, availableAuthors }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const getSelectValue = () => {
        const authorId = image.authorId || '';
        if (String(authorId).startsWith('new-author-')) {
            return `new-author-${index}`;
        }
        return authorId;
    };

    return (
        <div ref={setNodeRef} style={style} className="image-form-item">
            <div {...attributes} {...listeners} className="drag-handle-images">
                <FontAwesomeIcon icon={faGripVertical} />
            </div>

            <div className="image-source-type-selector">
              <label>
                <input type="radio" value="url" checked={image.sourceType === 'url'} onChange={() => onImageSourceTypeChange(index, 'url')} /> Attēla URL
              </label>
              <label>
                <input type="radio" value="upload" checked={image.sourceType === 'upload'} onChange={() => onImageSourceTypeChange(index, 'upload')} /> Augšupielādēt failu
              </label>
            </div>

            {/* GALVENAIS LABOJUMS ŠEIT: */}
            <div style={{ display: image.sourceType === 'url' ? 'block' : 'none', width: '100%' }}>
                <label className="card-form-label">Attēla URL {index + 1}:</label>
                <input type="text" value={image.url || ''} onChange={(e) => onImageChange(index, 'url', e.target.value)} className="card-form-input" placeholder="https://example.com/image.jpg" />
            </div>
            <div style={{ display: image.sourceType === 'upload' ? 'block' : 'none', width: '100%' }}>
                <label className="card-form-label">Augšupielādēt attēlu {index + 1}:</label>
                <input type="file" onChange={(e) => onImageFileChange(index, e.target.files[0])} className="card-form-input" accept="image/*" />
            </div>

            <label className="card-form-label">Attēla Apraksts {index + 1}:</label>
            <textarea value={image.description || ''} onChange={(e) => onImageChange(index, 'description', e.target.value)} rows="2" className="card-form-textarea" placeholder="Īss apraksts attēlam"></textarea>

            <label htmlFor={`image-author-${index}`} className="card-form-label">Attēla autors {index + 1}:</label>
            <select id={`image-author-${index}`} value={getSelectValue()} onChange={(e) => handleImageAuthorSelectChange(index, e)} className="card-form-select">
              <option value="">-- Izvēlēties autoru --</option>
              {availableAuthors.map((author) => (<option key={author.id} value={author.id}>{author.name}</option>))}
              <option value={`new-author-${index}`}>Jauns autors...</option>
            </select>
            
            {String(image.authorId || '').startsWith('new-author-') && (
              <input type="text" value={image.newImageAuthorNameInput || ''} onChange={(e) => handleNewImageAuthorNameInputChange(index, e)} placeholder="Ievadiet jauna autora vārdu" className="card-form-input new-author-input" style={{ marginTop: '10px' }}/>
            )}

            {images.length > 1 && (
              <button type="button" onClick={() => handleRemoveImage(index)} className="image-remove-button">×</button>
            )}
            <div className="card-form-image-preview-wrapper">
              {image.url ? (<img src={image.url} alt="Priekšskatījums" className="card-form-image-preview" />) : (<div className="card-form-image-placeholder">Nav attēla</div>)}
            </div>
        </div>
    );
};


const CardFormImageSection = (props) => {
  const { images, handleAddImage } = props;

  return (
    <div className="card-form-image-section">
      <h3>Attēli (Slaidrādei):</h3>
      <SortableContext items={images.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="image-form-items-container">
            {images.map((image, index) => (
              <SortableImageItem key={image.id} index={index} image={image} {...props} />
            ))}
          </div>
      </SortableContext>
      <button type="button" onClick={handleAddImage} className="card-form-add-image-button">Pievienot vēl attēlu</button>
    </div>
  );
};

export default CardFormImageSection;
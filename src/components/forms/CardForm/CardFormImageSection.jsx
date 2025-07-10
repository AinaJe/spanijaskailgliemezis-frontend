// src/components/forms/CardForm/CardFormImageSection.jsx
import React from 'react'; // Importējam React

/**
 * Kartītes formas attēlu sadaļas komponente.
 * Pārvalda attēlu pievienošanu, rediģēšanu, avota izvēli un noņemšanu.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.images - Masīvs ar attēlu objektiem.
 * @param {function} props.onImageChange - Funkcija, kas apstrādā attēla lauka izmaiņas.
 * @param {function} props.onImageFileChange - Funkcija, kas apstrādā faila augšupielādes izmaiņas.
 * @param {function} props.onImageSourceTypeChange - Funkcija, kas apstrādā avota tipa izmaiņas.
 * @param {function} props.handleAddImage - Funkcija, kas pievieno jaunu attēla lauku.
 * @param {function} props.handleRemoveImage - Funkcija, kas noņem attēla lauku.
 * @param {function} props.handleImageAuthorSelectChange - Funkcija, kas apstrādā attēla autora izvēli.
 * @param {function} props.handleNewImageAuthorNameInputChange - Funkcija, kas apstrādā jauna attēla autora vārda ievadi.
 * @param {Array<object>} props.availableAuthors - Pieejamo autoru masīvs.
 */
const CardFormImageSection = ({
  images,
  onImageChange,
  onImageFileChange,
  onImageSourceTypeChange,
  handleAddImage,
  handleRemoveImage,
  handleImageAuthorSelectChange,
  handleNewImageAuthorNameInputChange,
  availableAuthors,
}) => {
  return (
    <div className="card-form-image-section">
      <h3>Attēli (Slaidrādei):</h3>
      <div className="image-form-items-container">
        {images.map((image, index) => (
          <div key={image.id} className="image-form-item">
            {/* Attēla avota izvēle (URL vai augšupielāde) */}
            <div className="image-source-type-selector">
              <label>
                <input
                  type="radio"
                  value="url"
                  checked={image.sourceType === 'url'}
                  onChange={() => onImageSourceTypeChange(index, 'url')}
                />
                Attēla URL
              </label>
              <label>
                <input
                  type="radio"
                  value="upload"
                  checked={image.sourceType === 'upload'}
                  onChange={() => onImageSourceTypeChange(index, 'upload')}
                />
                Augšupielādēt failu
              </label>
            </div>

            {/* Dinamiski attēlojam atbilstošo ievades lauku */}
            {image.sourceType === 'url' ? (
              <>
                <label className="card-form-label">Attēla URL {index + 1}:</label>
                <input
                  type="text"
                  // value={image.url || ''} Savādāk kļūda
                  onChange={(e) => onImageChange(index, 'url', e.target.value)}
                  className="card-form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </>
            ) : (
              <>
                <label className="card-form-label">Augšupielādēt attēlu {index + 1}:</label>
                <input
                  type="file"
                  onChange={(e) => onImageFileChange(index, e.target.files[0])}
                  className="card-form-input"
                  accept="image/*"
                />
              </>
            )}

            <label className="card-form-label">Attēla Apraksts {index + 1}:</label>
            <textarea
              value={image.description}
              onChange={(e) => onImageChange(index, 'description', e.target.value)}
              rows="2"
              className="card-form-textarea"
              placeholder="Īss apraksts attēlam"
            ></textarea>

            <label htmlFor={`image-author-${index}`} className="card-form-label">Attēla autors {index + 1}:</label>
            <select
              id={`image-author-${index}`}
              value={String(image.authorId).startsWith('new-author-') ? `new-author-${index}` : image.authorId}
              onChange={(e) => handleImageAuthorSelectChange(index, e)}
              className="card-form-select"
            >
              <option value="">-- Izvēlēties autoru --</option>
              {availableAuthors.map((author) => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
              <option value={`new-author-${index}`}>Jauns autors...</option>
            </select>
            {/* Teksta lauks jaunam autoram, ja izvēlēts */}
            {image.authorId && String(image.authorId).startsWith('new-author-') && (
              <input
                type="text"
                value={image.newImageAuthorNameInput}
                onChange={(e) => handleNewImageAuthorNameInputChange(index, e)}
                placeholder="Ievadiet jauna autora vārdu"
                className="card-form-input new-author-input"
                style={{ marginTop: '10px' }}
              />
            )}

            {/* Poga attēla noņemšanai (nav redzama, ja ir tikai viens attēls) */}
            {images.length > 1 && (
              <button type="button" onClick={() => handleRemoveImage(index)} className="image-remove-button">×</button>
            )}
            {/* Attēla priekšskatījums */}
            <div className="card-form-image-preview-wrapper">
              {image.url ? (
                <img src={image.url} alt="Priekšskatījums" className="card-form-image-preview" />
              ) : (
                <div className="card-form-image-placeholder">Nav attēla</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Poga jauna attēla pievienošanai */}
      <button type="button" onClick={handleAddImage} className="card-form-add-image-button">Pievienot vēl attēlu</button>
    </div>
  );
};

export default CardFormImageSection; // Eksportējam komponenti
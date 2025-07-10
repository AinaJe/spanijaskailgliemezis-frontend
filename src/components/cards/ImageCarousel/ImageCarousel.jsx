// src/components/cards/ImageCarousel/ImageCarousel.jsx
import React, { useState } from 'react'; // Importējam React un useState hooku
import './ImageCarousel.css'; // Importējam šīs komponentes stilus

/**
 * Attēlu karuseļa komponente.
 * Attēlo attēlu kolekciju, ļaujot lietotājam pārvietoties starp tiem.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.images - Attēlu masīvs, kur katrs objekts satur { url, description, authorId }.
 * @param {Array<object>} props.availableAuthors - Pieejamo autoru masīvs (lai attēlotu autora vārdu).
 * @param {function} props.onImageClick - Funkcija, kas tiek izsaukta, noklikšķinot uz attēla (lai atvērtu pilnekrāna skatu).
 */
const ImageCarousel = ({ images, availableAuthors, onImageClick }) => {
  // Stāvoklis, kas norāda pašlaik attēloto attēla indeksu
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ja nav attēlu vai masīvs ir tukšs, attēlojam ziņojumu
  if (!images || images.length === 0) {
    return <p className="image-carousel-no-images">Nav pieejami attēli.</p>;
  }

  // Funkcija pārvietošanās uz iepriekšējo attēlu
  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0; // Pārbaudām, vai ir pirmais attēls
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1; // Ja pirmais, pārejam uz pēdējo, citādi uz iepriekšējo
    setCurrentIndex(newIndex); // Atjaunojam indeksu
  };

  // Funkcija pārvietošanās uz nākamo attēlu
  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1; // Pārbaudām, vai ir pēdējais attēls
    const newIndex = isLastImage ? 0 : currentIndex + 1; // Ja pēdējais, pārejam uz pirmo, citādi uz nākamo
    setCurrentIndex(newIndex); // Atjaunojam indeksu
  };

  // Iegūstam pašreizējo attēlu
  const currentImage = images[currentIndex];
  // Atrodam attēla autora vārdu, pamatojoties uz authorId, vai izmantojam noklusējuma vērtību
  const imageAuthor = availableAuthors ? availableAuthors.find(a => a.id === currentImage.authorId) : null;
  const imageAuthorName = imageAuthor ? imageAuthor.name : 'Nezināms autors';

  return (
    <div className="image-carousel">
      <div className="image-carousel-display">
        {/* Attēls, kas tiek rādīts karuselī. Noklikšķinot, izsauc onImageClick funkciju. */}
        <img
          src={currentImage.url}
          alt={currentImage.description || 'Karuselis attēls'} // Alt teksts no apraksta vai noklusējuma
          className="image-carousel-image"
          onClick={() => onImageClick(currentImage)}
        />
      </div>
      {/* Attēla apraksts un autors, ja apraksts ir pieejams */}
      {currentImage.description && (
        <p className="image-carousel-description">
          {currentImage.description} (Autors: {imageAuthorName})
        </p>
      )}

      {/* Navigācijas pogas un lapošanas indikators, ja ir vairāk par vienu attēlu */}
      {images.length > 1 && (
        <>
          {/* Iepriekšējais attēls poga */}
          <button
            type="button"
            onClick={goToPrevious}
            className="image-carousel-button prev"
            aria-label="Iepriekšējais attēls"
          >
            &lt; {/* Kreisa bulta */}
          </button>
          {/* Nākamais attēls poga */}
          <button
            type="button"
            onClick={goToNext}
            className="image-carousel-button next"
            aria-label="Nākamais attēls"
          >
            &gt; {/* Labā bulta */}
          </button>
          {/* Lapošanas indikators (piemēram, "1 / 5") */}
          <div className="image-carousel-pagination">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel; // Eksportējam komponenti
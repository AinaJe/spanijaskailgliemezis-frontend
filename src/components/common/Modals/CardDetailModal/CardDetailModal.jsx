// src/components/common/Modals/CardDetailModal/CardDetailModal.jsx
import React, { useState, lazy, Suspense } from 'react'; // Importējam React un useState, kā arī lazy/Suspense dinamiskai ielādei
import './CardDetailModal.css'; // Importējam šīs komponentes stilus

// Dinamiski ielādējam ImageCarousel un ImageFullscreenModal, lai samazinātu sākotnējo ielādes laiku
// Šīs komponentes tiks ielādētas tikai tad, kad tās būs nepieciešamas (t.i., atverot modālo logu)
const ImageCarousel = lazy(() => import('../../../cards/ImageCarousel/ImageCarousel')); // Ceļš uz ImageCarousel
const ImageFullscreenModal = lazy(() => import('../ImageFullscreenModal/ImageFullscreenModal'));


// Importējam RichTextEditor (šoreiz nav lazy, jo to var izmantot bieži vai arī var padarīt par lazy)
import RichTextEditor from '../../RichTextEditor/RichTextEditor';

/**
 * Kartītes detalizētā skata modālā loga komponente.
 * Attēlo kartītes pilnu informāciju, ieskaitot attēlu karuseli un aprakstu.
 * @param {object} props - Komponentes props.
 * @param {object} props.card - Kartītes objekts ar informāciju.
 * @param {function} props.onClose - Funkcija, kas tiek izsaukta, lai aizvērtu modālo logu.
 */
const CardDetailModal = ({ card, onClose }) => {
  // Stāvoklis, lai kontrolētu pilnekrāna attēla modālo logu
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Ja kartīte nav padota, nerādām neko
  if (!card) {
    return null;
  }

  // Iegūstam autora vārdu vai noklusējuma vērtību
  const authorName = card.authorName || 'Nezināms autors';

  // Funkcija, kas tiek izsaukta, noklikšķinot uz attēla karuselī, lai atvērtu pilnekrāna skatu
  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  // Funkcija, kas tiek izsaukta, lai aizvērtu pilnekrāna attēla modālo logu
  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    // Modālā loga pārklājums (fons), kas aizver logu, ja noklikšķina ārpus satura
    <div className="card-detail-modal-overlay" onClick={onClose}>
      {/* Modālā loga saturs, kura klikšķi tiek apturēti, lai neaizvērtu logu */}
      <div className="card-detail-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Aizvēršanas poga */}
        <button type="button" onClick={onClose} className="card-detail-modal-close-button">
          &times; {/* Reizes simbols */}
        </button>

        <h2>{card.title}</h2> {/* Kartītes virsraksts */}
        {/* Tēmas informācija. Pagaidām izmantojam card.theme, kas ir ID,
            bet vēlāk varētu būt nepieciešams izgūt tēmas nosaukumu.
            Jūsu App.jsx jau izgūst themeName un themeSummary, tāpēc to var izmantot.
            Šeit pielāgoju, lai izmantotu card.themeName, ja pieejams. */}
        <p className="card-detail-modal-theme"><strong>Tēma:</strong> {card.themeName || card.theme}</p>
        <p className="card-detail-modal-author"><strong>Autors:</strong> {authorName}</p>
        {card.summary && <p className="card-detail-modal-summary">{card.summary}</p>} {/* Kartītes kopsavilkums, ja pieejams */}

        {/* Attēlojam attēlu karuseli, ja kartītei ir attēli */}
        {card.images && card.images.length > 0 && (
          // Suspense komponents, kas attēlo fallback saturu, kamēr ImageCarousel tiek ielādēts
          <Suspense fallback={<div>Ielādē attēlus...</div>}>
            <ImageCarousel images={card.images} availableAuthors={card.allAuthors} onImageClick={handleImageClick} />
          </Suspense>
        )}

        {/* Apraksta sadaļa */}
        <div className="card-detail-content-section">
          <h3>Apraksts:</h3>
          {/* RichTextEditor, kas attēlo aprakstu tikai skatīšanās režīmā (onContentChange=null) */}
          <RichTextEditor content={card.description} onContentChange={null} />
        </div>
      </div>

      {/* Pilnekrāna attēla modālais logs, tiek attēlots, ja fullscreenImage ir definēts */}
      {fullscreenImage && (
        // Suspense komponents, kas attēlo fallback saturu, kamēr ImageFullscreenModal tiek ielādēts
        <Suspense fallback={<div>Ielādē pilnekrāna attēlu...</div>}>
          <ImageFullscreenModal
            imageUrl={fullscreenImage.url}
            description={fullscreenImage.description}
            onClose={handleCloseFullscreen}
          />
        </Suspense>
      )}
    </div>
  );
};

export default CardDetailModal; // Eksportējam komponenti
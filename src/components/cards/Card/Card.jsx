// src/components/cards/Card/Card.jsx
import React from 'react'; // Importējam React, jo izmantojam JSX
import './Card.css'; // Importējam šīs komponentes stilus

/**
 * Kartītes attēlošanas komponente.
 * Attēlo vienu kartīti ar virsrakstu, attēlu, kopsavilkumu un autoru, kā arī "Lasīt vairāk" pogu.
 * @param {object} props - Komponentes props.
 * @param {object} props.card - Kartītes objekts ar informāciju.
 * @param {function} props.onReadMore - Funkcija, kas tiek izsaukta, noklikšķinot uz "Lasīt vairāk" pogas.
 * @param {Array<object>} props.availableAuthors - Masīvs ar pieejamajiem autoriem, lai atrastu autora vārdu.
 */
const Card = ({ card, onReadMore, availableAuthors }) => {
  // Atrodam kartītes autora datus, izmantojot authorId, ja pieejams
  const cardAuthor = availableAuthors ? availableAuthors.find(a => a.id === card.authorId) : null;
  // Attēlojamā autora vārds vai noklusējuma vērtība
  const displayAuthorName = cardAuthor ? cardAuthor.name : 'Nezināms autors';

  // Pārbaudām, vai kartītei ir attēls (pirmais attēls masīvā ar URL)
  const hasImage = card.images && card.images.length > 0 && card.images[0].url;

  return (
    <div className={`card`}>
      <div>
        {/* Kartītes virsraksts */}
        <h3>{card.title}</h3>
        {/* Attēla priekšskatījums vai vietturis, ja attēla nav */}
        {hasImage ? (
          <div className="card-image-preview">
            <img
              src={card.images[0].url}
              alt={card.images[0].description || 'Kartītes attēls'}
              className="card-preview-main-image"
            />
          </div>
        ) : (
          <div className="card-image-placeholder">
            <p>Iesūti atbilstošu attēlu ar Google veidlapu.</p>
          </div>
        )}
        {/* Kartītes kopsavilkums */}
        <p className="card-summary">
          {card.summary}
        </p>
      </div>

      {/* Autora displejs, ja autorId ir norādīts */}
      {card.authorId && (
        <p className="card-author-display">Autors: {displayAuthorName}</p>
      )}

      {/* "Lasīt vairāk" poga */}
      <button
        type="button"
        onClick={() => onReadMore(card)} // Izsauc onReadMore funkciju ar pašreizējo kartītes objektu
        className="card-read-more-button"
      >
        Lasīt vairāk
      </button>
    </div>
  );
};

export default Card; // Eksportējam komponenti
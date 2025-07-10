// src/components/cards/CardList/CardList.jsx
import React from "react"; // Importējam React
import Card from "../Card/Card"; // Importējam Card komponenti
import "./CardList.css"; // Importējam šīs komponentes stilus

/**
 * Kartīšu saraksta komponente.
 * Attēlo kartītes sarakstā, izmantojot Card komponentes.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.cards - Kartīšu masīvs, kas jāattēlo.
 * @param {function} props.onReadMore - Funkcija, kas tiek padota katrai Card komponentei, lai atvērtu detalizēto skatu.
 * @param {Array<object>} props.availableAuthors - Pieejamo autoru masīvs, kas tiek padots Card komponentēm.
 */
const CardList = ({ cards, onReadMore, availableAuthors }) => {
  return (
    <div className={`card-list-container`}>
      {/* Pārbaudām, vai ir kartītes, ko attēlot */}
      {cards.length === 0 ? (
        <p className="no-cards-message">
          Nav neviena ieraksta!
        </p>
      ) : (
        // Iterējam cauri kartīšu masīvam un renderējam katru Card komponenti
        cards.map((card) => (
          <Card
            key={card.id} // Unikāla atslēga katrai kartei, kas ir svarīga React sarakstu renderēšanai
            card={card} // Padodam kartītes datus Card komponentei
            onReadMore={onReadMore} // Padodam onReadMore funkciju
            availableAuthors={availableAuthors} // Padodam pieejamos autorus
          />
        ))
      )}
    </div>
  );
};

export default CardList; // Eksportējam komponenti
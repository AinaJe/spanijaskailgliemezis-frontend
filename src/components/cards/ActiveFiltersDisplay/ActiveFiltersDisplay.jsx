// src/components/cards/ActiveFiltersDisplay/ActiveFiltersDisplay.jsx
import React from 'react'; // Importējam React
import './ActiveFiltersDisplay.css'; // Importējam šīs komponentes stilus

/**
 * Aktīvo filtru displeja komponente.
 * Attēlo pašlaik aktīvos filtrus un nodrošina iespēju tos noņemt vai notīrīt visus.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.filters - Masīvs ar aktīvajiem filtriem. Katrs objekts satur { type, id, value }.
 * @param {function} props.onRemoveFilter - Funkcija, kas tiek izsaukta, lai noņemtu konkrētu filtru.
 * @param {function} props.onClearAllFilters - Funkcija, kas tiek izsaukta, lai notīrītu visus filtrus.
 */
const ActiveFiltersDisplay = ({ filters, onRemoveFilter, onClearAllFilters }) => {
  // Ja nav aktīvu filtru, nerādām neko
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="active-filters-display-container">
      {/* Etiķete, kas norāda "Aktīvie filtri:" */}
      <span className="active-filters-label">Aktīvie filtri:</span>
      {/* Aktīvo filtru tagu saraksts */}
      <div className="active-filters-list">
        {filters.map(filter => (
          // Katrs filtra tags ir unikāls, izmantojot filtru tipu un ID kā atslēgu
          <span key={`${filter.type}-${filter.id}`} className="active-filter-tag">
            {/* Attēlojam filtra tipu un vērtību */}
            {filter.type === 'theme' && `Tēma: ${filter.value}`}
            {filter.type === 'author' && `Autors: ${filter.value}`}
            {filter.type === 'selectedCards' && `Atlasītas: ${filter.value}`}
            {/* Poga, lai noņemtu konkrēto filtru */}
            <button
              onClick={() => onRemoveFilter(filter)}
              className="remove-filter-button"
              aria-label={`Noņemt filtru ${filter.value}`}
            >
              &times; {/* Reizes simbols */}
            </button>
          </span>
        ))}
      </div>
      {/* Poga, lai notīrītu visus filtrus */}
      <button
        onClick={onClearAllFilters}
        className="clear-all-filters-button"
        aria-label="Notīrīt visus filtrus"
      >
        Notīrīt visus filtrus
      </button>
    </div>
  );
};

export default ActiveFiltersDisplay; // Eksportējam komponenti
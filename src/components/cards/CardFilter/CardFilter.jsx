// src/components/cards/CardFilter/CardFilter.jsx
import React, { useState, useCallback, useMemo } from 'react';
import './CardFilter.css';
import Accordion from '../../common/Accordion/Accordion';

/**
 * Kartīšu filtru komponente.
 * Nodrošina autoru filtrēšanu un kartīšu atlasi pēc nosaukuma,
 * ar iespēju grupēt kartītes pa tēmām akordeonā.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.authors - Pieejamo autoru masīvs.
 * @param {Array<number>} props.filterAuthors - Masīvs ar pašlaik atlasītajiem autoru ID.
 * @param {function} props.setFilterAuthors - Funkcija, kas atjaunina atlasīto autoru masīvu.
 * @param {Array<object>} props.allCards - Masīvs ar visām kartītēm (nefiltrētām/nelapotām).
 * @param {Array<number>} props.selectedCardIds - Masīvs ar pašlaik atlasīto karšu ID atlases filtrā.
 * @param {function} props.onToggleCardSelection - Funkcija, kas ieslēdz/izslēdz kartītes atlasi.
 * @param {function} props.onClearAllSelections - Funkcija, kas notīra visas kartīšu atlases.
 * @param {string} [props.currentThemeSummary] - Pašreizējās tēmas kopsavilkums (tikai tekstam, ja nav "Visas").
 * @param {Array<object>} props.allThemesData - Masīvs ar visiem tēmu datiem.
 * @param {function} props.onApplyFilters - Funkcija, kas tiek izsaukta, lai pielietotu filtrus (piem., aizvērtu modāli).
 * @param {number|string} props.activePageTheme - Aktīvās lapas tēmas ID (no App.jsx filterTheme).
 */
const CardFilter = ({
  authors,
  filterAuthors,
  setFilterAuthors,
  allCards,
  selectedCardIds,
  onToggleCardSelection,
  onClearAllSelections,
  currentThemeSummary,
  allThemesData,
  onApplyFilters,
  activePageTheme,
}) => {
  const [openAccordionId, setOpenAccordionId] = useState(null);

  // JAUNS: Izveidojam sarakstu ar autoriem, kuri ir redzami pašreizējā kartīšu atlasē
  const relevantAuthors = useMemo(() => {
    // Nodrošināmies, ka dati ir masīvi
    const safeAllCards = Array.isArray(allCards) ? allCards : [];
    const safeAuthors = Array.isArray(authors) ? authors : [];

    // Iegūstam unikālus autoru ID no pašreizējā kartīšu saraksta
    const authorIdsInCurrentCards = new Set(safeAllCards.map(card => card.authorId));

    // Filtrējam kopējo autoru sarakstu, atstājot tikai tos, kas ir atrodami kartītēs
    return safeAuthors.filter(author => authorIdsInCurrentCards.has(author.id));
  }, [allCards, authors]);


  const handleAuthorCheckboxChange = (authorId) => {
    setFilterAuthors(prevSelectedAuthors =>
      prevSelectedAuthors.includes(authorId)
        ? prevSelectedAuthors.filter(id => id !== authorId)
        : [...prevSelectedAuthors, authorId]
    );
  };

  const getDisplayableCardsForSelection = useCallback((themeId = null) => {
    const safeAllCards = Array.isArray(allCards) ? allCards : [];

    return safeAllCards.filter(card => {
      if (!card || typeof card !== 'object' || !('id' in card) || !('theme' in card) || !('authorId' in card)) {
        return false;
      }

      const matchesTheme = (themeId === null)
        ? (activePageTheme === 'all' || card.theme === activePageTheme)
        : (card.theme === themeId);

      const excludeHomePageCards = card.theme === 1 && activePageTheme !== 1;
      
      const matchesAuthors = filterAuthors.length === 0 || filterAuthors.includes(card.authorId);
      
      return matchesTheme && matchesAuthors && !excludeHomePageCards;
    });
  }, [allCards, activePageTheme, filterAuthors]);

  const groupedCardsByTheme = useMemo(() => {
    const groups = {};
    if (activePageTheme === 'all') {
      const themesForAccordion = Array.isArray(allThemesData)
        ? allThemesData.filter(t => t && typeof t === 'object' && 'id' in t && !['all', 1, 104, 105, 106, 107, 108, 109].includes(t.id))
        : [];
      
      if (themesForAccordion.length > 0) {
          themesForAccordion.forEach(theme => {
            const cardsInTheme = getDisplayableCardsForSelection(theme.id);
            if (cardsInTheme.length > 0) {
              groups[theme.id] = {
                theme: theme,
                cards: cardsInTheme,
              };
            }
          });
      }
    }
    return groups;
  }, [activePageTheme, getDisplayableCardsForSelection, allThemesData]);


  const handleAccordionToggle = (id) => {
    setOpenAccordionId(prevId => (prevId === id ? null : id));
  };

  const handleApplyAndClose = () => {
    onApplyFilters();
  };

  return (
    <div className="card-filter-container">
      <div className="filter-group">
        <label className="filter-label">Filtrēt pēc autora:</label>
        <div className="author-checkbox-group">
          {/* Tagad izmantojam jauno `relevantAuthors` sarakstu */}
          {relevantAuthors.map(author => (
            author && typeof author === 'object' && 'id' in author && (
              <label key={author.id} className="author-checkbox-label">
                <input
                  type="checkbox"
                  value={author.id}
                  checked={filterAuthors.includes(author.id)}
                  onChange={() => handleAuthorCheckboxChange(author.id)}
                  className="author-checkbox"
                />
                {author.name}
              </label>
            )
          ))}
        </div>
      </div>

      <div className="filter-group">
        {activePageTheme === 'all' ? (
          <label className="filter-label">Atlasīt kartītes pēc nosaukuma:</label>
        ) : (
          <label className="filter-label">
            {currentThemeSummary ? currentThemeSummary : 'Atlasīt kartītes:'}
          </label>
        )}

        {activePageTheme === 'all' ? (
          <div className="accordion-filter-wrapper">
            {Object.values(groupedCardsByTheme).length === 0 ? (
              <p className="no-cards-message-filter">Nav atbilstošu kartīšu.</p>
            ) : (
              Object.values(groupedCardsByTheme).map(group => (
                <Accordion
                  key={group.theme.id}
                  title={group.theme.name} 
                  isOpen={openAccordionId === group.theme.id}
                  onToggle={() => handleAccordionToggle(group.theme.id)}
                  content={
                    <div className="card-selection-list nested">
                      {Array.isArray(group.cards) && group.cards.map(card => (
                        card && typeof card === 'object' && 'id' in card && (
                          <label key={card.id} className="card-selection-label">
                            <input
                              type="checkbox"
                              value={card.id}
                              checked={selectedCardIds.includes(card.id)}
                              onChange={() => onToggleCardSelection(card.id)}
                              className="card-selection-checkbox"
                            />
                            <span className="card-selection-title">{card.title}</span>
                          </label>
                        )
                      ))}
                    </div>
                  }
                />
              ))
            )}
          </div>
        ) : (
          <div className="card-selection-list">
            {getDisplayableCardsForSelection().length === 0 ? (
              <p className="no-cards-message-filter">Nav atbilstošu kartīšu.</p>
            ) : (
              Array.isArray(getDisplayableCardsForSelection()) && getDisplayableCardsForSelection().map(card => (
                card && typeof card === 'object' && 'id' in card && (
                  <label key={card.id} className="card-selection-label">
                    <input
                      type="checkbox"
                      value={card.id}
                      checked={selectedCardIds.includes(card.id)}
                      onChange={() => onToggleCardSelection(card.id)}
                      className="card-selection-checkbox"
                    />
                    <span className="card-selection-title">{card.title}</span>
                  </label>
                )
              ))
            )}
          </div>
        )}
      </div>

      <div className="selection-actions">
        {selectedCardIds.length > 0 && (
            <button type="button" onClick={onClearAllSelections} className="selection-button secondary">
                Notīrīt atlasi ({selectedCardIds.length})
            </button>
         )}
        <button type="button" onClick={handleApplyAndClose} className="selection-button confirm">
            Atlasīt un Aizvērt
        </button>
      </div>
    </div>
  );
};

export default CardFilter;
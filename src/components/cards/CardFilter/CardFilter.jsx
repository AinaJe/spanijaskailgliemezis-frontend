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
  // Stāvoklis, kas kontrolē, kurš akordeona elements ir atvērts
  const [openAccordionId, setOpenAccordionId] = useState(null);

  // Funkcija, kas tiek izsaukta, mainot autora izvēles rūtiņu
  const handleAuthorCheckboxChange = (authorId) => {
    setFilterAuthors(prevSelectedAuthors =>
      prevSelectedAuthors.includes(authorId)
        ? prevSelectedAuthors.filter(id => id !== authorId) // Ja autors jau ir atlasīts, noņem to
        : [...prevSelectedAuthors, authorId] // Ja nav atlasīts, pievieno to
    );
  };

  // Funkcija, kas atgriež kartītes, kuras ir attēlojamas atlases filtrā
  // Izmanto useCallback, lai optimizētu un novērstu nevajadzīgu renderēšanu
  const getDisplayableCardsForSelection = useCallback((themeId = null) => {
    // Nodrošinām, ka allCards ir masīvs
    const safeAllCards = Array.isArray(allCards) ? allCards : [];

    return safeAllCards.filter(card => {
      // Pārbaudām, vai karte ir derīgs objekts ar ID
      if (!card || typeof card !== 'object' || !('id' in card) || !('theme' in card) || !('authorId' in card)) {
        return false; // Ignorējam nederīgas kartes
      }

      // Nosaka, vai karte atbilst tēmai (vai nu aktīvajai lapas tēmai, vai konkrētajai akordeona tēmai)
      const matchesTheme = (themeId === null)
        ? (activePageTheme === 'all' || card.theme === activePageTheme) // Ja nav akordeona, pārbauda pret "Visas" (ID 'all') vai aktīvo lapas tēmu
        : (card.theme === themeId); // Ja ir akordeons, pārbauda pret konkrēto tēmu ID

      // Izslēdz "Sākums" tēmas kartītes (ID 1) no filtra, ja vien pati lapa nav "Sākums"
      const excludeHomePageCards = card.theme === 1 && activePageTheme !== 1; // ID 1 ir "Sākums" tēma
      
      // Nosaka, vai karte atbilst atlasītajiem autoriem
      const matchesAuthors = filterAuthors.length === 0 || filterAuthors.includes(card.authorId);
      
      return matchesTheme && matchesAuthors && !excludeHomePageCards;
    });
  }, [allCards, activePageTheme, filterAuthors]);

  // Grupē kartītes pa tēmām izmantošanai akordeonā
  // Izmanto useMemo, lai optimizētu un pārrēķinātu tikai tad, kad mainās atkarības
  const groupedCardsByTheme = useMemo(() => {
    const groups = {};
    // Akordeona grupēšana notiek tikai, ja aktīvā lapas tēma ir "Visas" (ID 'all')
    if (activePageTheme === 'all') {
      // Filtrējam tēmas, lai akordeonā nerādītu "Sākums" (ID 1), "Visas" (ID 'all'),
      // un galvenās navigācijas tēmas (Biedrība, Tirdzniecība, Stāsti, Izdrukām, Raksti, Video)
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


  // Funkcija akordeona atvēršanas/aizvēršanas pārvaldībai
  const handleAccordionToggle = (id) => {
    setOpenAccordionId(prevId => (prevId === id ? null : id));
  };

  // Funkcija filtru pielietošanai un modālā loga aizvēršanai
  const handleApplyAndClose = () => {
    onApplyFilters();
  };

  return (
    <div className="card-filter-container">
      {/* Filtra grupa autoriem */}
      <div className="filter-group">
        <label className="filter-label">Filtrēt pēc autora:</label>
        <div className="author-checkbox-group">
          {Array.isArray(authors) && authors.map(author => (
            // Pārbaudām, vai autors ir derīgs objekts ar ID
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

      {/* Filtra grupa kartīšu atlasei */}
      <div className="filter-group">
        {/* Etiķete mainās atkarībā no aktīvās lapas tēmas */}
        {activePageTheme === 'all' ? ( // Ja aktīvā lapas tēma ir "Visas"
          <label className="filter-label">Atlasīt kartītes pēc nosaukuma:</label>
        ) : ( // Citādi, rāda tēmas kopsavilkumu vai vispārīgu atlases etiķeti
          <label className="filter-label">
            {currentThemeSummary ? currentThemeSummary : 'Atlasīt kartītes:'}
          </label>
        )}

        {/* Akordeona grupēšana tikai, ja activePageTheme ir "Visas" */}
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
                        card && typeof card === 'object' && 'id' in card && ( // Papildu drošības pārbaude
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
          // Ja activePageTheme nav "Visas", attēlo vienkāršu karšu atlases sarakstu bez akordeoniem
          <div className="card-selection-list">
            {getDisplayableCardsForSelection().length === 0 ? (
              <p className="no-cards-message-filter">Nav atbilstošu kartīšu.</p>
            ) : (
              Array.isArray(getDisplayableCardsForSelection()) && getDisplayableCardsForSelection().map(card => (
                card && typeof card === 'object' && 'id' in card && ( // Papildu drošības pārbaude
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

      {/* Atlases darbību pogas */}
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
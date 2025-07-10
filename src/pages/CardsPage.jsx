// src/pages/CardsPage.jsx
import React from 'react'; // Importējam React
import CardFilter from '../components/cards/CardFilter/CardFilter'; // Importējam CardFilter komponenti
import ActiveFiltersDisplay from '../components/cards/ActiveFiltersDisplay/ActiveFiltersDisplay'; // Importējam ActiveFiltersDisplay komponenti
import ThemeDetailDisplay from '../components/common/ThemeDetailDisplay/ThemeDetailDisplay'; // Importējam ThemeDetailDisplay komponenti
import CardList from '../components/cards/CardList/CardList'; // Importējam CardList komponenti
import Pagination from '../components/common/Pagination/Pagination'; // Importējam Pagination komponenti
import Modal from '../components/common/Modals/Modal'; // Importējam Modal komponenti

/**
 * Kartīšu lapas komponente ("Ieteikumi", "Biedrība", "Tirdzniecība", "Stāsti", "Izdrukām").
 * Attēlo kartīšu sarakstu, nodrošinot filtru funkcionalitāti, aktīvo filtru displeju un lapošanu.
 * @param {object} props - Komponentes props.
 * @param {object} props.cards - Kartīšu objekts ar diviem masīviem:
 * @param {Array<object>} props.cards.rawCards - Neapstrādāts, filtrēts kartīšu masīvs, ko izmanto filtrēšanas loģikā.
 * @param {Array<object>} props.cards.paginated - Lapots kartīšu masīvs, kas jāattēlo.
 * @param {Array<object>} props.authors - Masīvs ar visiem pieejamajiem autoriem.
 * @param {function} props.onReadMore - Funkcija, kas tiek padota CardList, lai atvērtu kartītes detalizēto skatu.
 * @param {number|string} props.filterTheme - Pašreizējā atlasītā tēma (ID).
 * @param {function} props.setFilterTheme - Funkcija, kas atjaunina atlasīto tēmu.
 * @param {Array<number>} props.filterAuthors - Masīvs ar pašlaik atlasīto autoru ID.
 * @param {function} props.setFilterAuthors - Funkcija, kas atjaunina atlasīto autoru masīvu.
 * @param {Array<number>} props.selectedFilteredCardIds - Masīvs ar atlasīto karšu ID filtrā.
 * @param {function} props.onToggleCardSelectionInFilter - Funkcija, kas ieslēdz/izslēdz kartītes atlasi filtrā.
 * @param {function} props.onClearCardSelections - Funkcija, kas notīra visas kartīšu atlases filtrā.
 * @param {string} [props.currentThemeSummary] - Pašreizējās tēmas kopsavilkums.
 * @param {Array<object>} props.allThemesData - Masīvs ar tēmu datiem, ko izmanto CardFilter akordeonā (izslēdzot galvenās nav. tēmas).
 * @param {boolean} props.isFilterModalOpen - Vai filtru modālais logs ir atvērts.
 * @param {function} props.setIsFilterModalOpen - Funkcija, kas maina filtru modālā loga stāvokli.
 * @param {Array<object>} props.activeFiltersList - Masīvs ar aktīvajiem filtriem priekš ActiveFiltersDisplay.
 * @param {function} props.handleRemoveFilter - Funkcija, kas noņem konkrētu filtru no ActiveFiltersDisplay.
 * @param {function} props.handleClearAllActiveFilters - Funkcija, kas notīra visus aktīvos filtrus.
 * @param {object} props.paginationProps - Objekts ar visiem lapošanas rekvizītiem.
 * @param {object} props.currentThemeDetail - Pašreizējās tēmas detaļu objekts priekš ThemeDetailDisplay.
 */
const CardsPage = ({
  cards, // Satur rawCards un paginatedCards
  authors,
  onReadMore,
  filterTheme,
  setFilterTheme,
  filterAuthors,
  setFilterAuthors,
  selectedFilteredCardIds,
  onToggleCardSelectionInFilter,
  onClearCardSelections,
  currentThemeSummary,
  allThemesData, // Jau filtrēts App.jsx, lai atbilstu CardsPage akordeona prasībām
  isFilterModalOpen,
  setIsFilterModalOpen,
  activeFiltersList,
  handleRemoveFilter,
  handleClearAllActiveFilters,
  paginationProps,
  currentThemeDetail
}) => {

  return (
    <>
      {/* Poga filtru modālā loga atvēršanai (tiek attēlota virs filtru displeja) */}
      <button
        type="button"
        onClick={() => setIsFilterModalOpen(true)}
        className="toggle-filters-button"
        aria-label="Rādīt filtru opcijas"
      >
        Rādīt filtrus
      </button>

      {/* Modālais logs filtriem. Atveras, noklikšķinot uz "Rādīt filtrus" pogas. */}
      <Modal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} title="Kartīšu filtri">
        <CardFilter
          filterTheme={filterTheme}
          setFilterTheme={setFilterTheme}
          authors={authors}
          filterAuthors={filterAuthors}
          setFilterAuthors={setFilterAuthors}
          allCards={cards.rawCards} // CardFilteram tiek padotas visas NE-lapotās kartītes
          selectedCardIds={selectedFilteredCardIds}
          onToggleCardSelection={onToggleCardSelectionInFilter}
          onClearAllSelections={onClearCardSelections}
          currentThemeSummary={currentThemeSummary}
          allThemesData={allThemesData} // Šis prop jau ir filtrēts no App.jsx puses, lai saturētu tikai relevantās tēmas akordeonam
          onApplyFilters={() => setIsFilterModalOpen(false)} // Aizver modāli, kad filtri ir pielietoti
          activePageTheme={filterTheme} // Informē CardFilter, kura tēma ir aktīva lapā, lai tas zinātu, vai rādīt akordeonu
        />
      </Modal>

      {/* Aktīvo filtru saraksts. Parādās tikai tad, ja ir aktīvi filtri. */}
      <ActiveFiltersDisplay
        filters={activeFiltersList}
        onRemoveFilter={handleRemoveFilter}
        onClearAllFilters={handleClearAllActiveFilters}
      />

      {/* Tēmas detaļu displejs. Parādās, ja ir izvēlēta specifiska tēma (nav "Visas"). */}
      {filterTheme !== 2 && currentThemeDetail && <ThemeDetailDisplay theme={currentThemeDetail} />} {/* ID 2 ir "Visas" tēma */}
      
      {/* Kartīšu saraksts (attēlo lapotās kartītes) */}
      <CardList
        cards={cards.paginated} // Padodam jau lapotās kartītes
        onReadMore={onReadMore}
        availableAuthors={authors}
      />

      {/* Lapošanas kontroles */}
      <Pagination {...paginationProps} />
    </>
  );
};

export default CardsPage; // Eksportējam komponenti
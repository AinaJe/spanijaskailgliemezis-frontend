// src/pages/CardsPage.jsx
import React from 'react';
import CardFilter from '../components/cards/CardFilter/CardFilter';
import ActiveFiltersDisplay from '../components/cards/ActiveFiltersDisplay/ActiveFiltersDisplay';
import ThemeDetailDisplay from '../components/common/ThemeDetailDisplay/ThemeDetailDisplay';
import CardList from '../components/cards/CardList/CardList';
import Pagination from '../components/common/Pagination/Pagination';
import Modal from '../components/common/Modals/Modal';

// Varētu importēt no useAppData, ja 'all' ir eksportēts kā konstante.
// Piemēram: import { ALL_THEMES_ID } from '../hooks/useAppData';
const ALL_THEMES_ID = 'all'; // Pārliecinieties, ka šis ID atbilst tam, kas definēts useAppData.js

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
    cards,
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
    allThemesData,
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
            <button
                type="button"
                onClick={() => setIsFilterModalOpen(true)}
                className="toggle-filters-button"
                aria-label="Rādīt filtru opcijas"
            >
                Rādīt filtrus
            </button>

            <Modal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} title="Kartīšu filtri">
                <CardFilter
                    filterTheme={filterTheme}
                    setFilterTheme={setFilterTheme}
                    authors={authors}
                    filterAuthors={filterAuthors}
                    setFilterAuthors={setFilterAuthors}
                    allCards={cards.rawCards}
                    selectedCardIds={selectedFilteredCardIds}
                    onToggleCardSelection={onToggleCardSelectionInFilter}
                    onClearAllSelections={onClearCardSelections}
                    currentThemeSummary={currentThemeSummary}
                    allThemesData={allThemesData}
                    onApplyFilters={() => setIsFilterModalOpen(false)}
                    activePageTheme={filterTheme}
                />
            </Modal>

            <ActiveFiltersDisplay
                filters={activeFiltersList}
                onRemoveFilter={handleRemoveFilter}
                onClearAllFilters={handleClearAllActiveFilters}
            />

            {/* Tagad izmantojam definēto konstanti ALL_THEMES_ID */}
            {filterTheme !== ALL_THEMES_ID && currentThemeDetail && <ThemeDetailDisplay theme={currentThemeDetail} />}

            <CardList
                cards={cards.paginated}
                onReadMore={onReadMore}
                availableAuthors={authors}
            />

            <Pagination {...paginationProps} />
        </>
    );
};

export default CardsPage;
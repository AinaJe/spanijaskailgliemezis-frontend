// src/App.jsx
import React, { lazy, Suspense } from 'react';
import './App.css';

// Importējam lapu komponentes
import HomePage from './pages/HomePage';
import CardsPage from './pages/CardsPage';
import ArticlesPage from './pages/ArticlesPage';
import VideosPage from './pages/VideosPage';
import AdminPage from './pages/AdminPage';

// Importējam izkārtojuma komponentes
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

// Importējam jauno pielāgoto āķi un no tā eksportētās konstantes
import useAppData, { ITEMS_PER_PAGE_OPTIONS, ALL_THEMES_ID } from './hooks/useAppData';

// Dinamiski ielādējam CardDetailModal (lai samazinātu sākotnējo ielādes laiku)
const LazyCardDetailModal = lazy(() => import('/src/components/common/Modals/CardDetailModal/CardDetailModal'));

function App() {
    // Iegūstam visus stāvokļus un funkcijas no useAppData āķa
    const {
        authors, setAuthors,
        themesData, setThemesData,
        cards, setCards, // <-- Sākotnējie kartīšu dati (tiek nodoti AdminPage, nevis tieši atveidošanai)
        articles, setArticles,
        videos, setVideos,
        selectedCard,
        activeSection, setActiveSection,
        activeTheme, setActiveTheme,
        filterTheme, setFilterTheme,
        filterAuthors, setFilterAuthors,
        selectedFilteredCardIds, setSelectedFilteredCardIds,
        isFilterModalOpen, setIsFilterModalOpen,
        cardsCurrentPage, setCardsCurrentPage,
        cardsItemsPerPage, setCardsItemsPerPage,
        articlesCurrentPage, setArticlesCurrentPage,
        articlesItemsPerPage, setArticlesItemsPerPage,
        videosCurrentPage, setVideosCurrentPage,
        videosItemsPerPage, setVideosItemsPerPage,
        handleReadMore, handleCloseModal,
        handleToggleCardSelectionInFilter,
        currentThemeDetail,
        filteredCardsBase, // Filtrētās, bet nelapotās kartītes (nepieciešamas filtriem)
        finalFilteredCards, // Galīgās filtrētās kartītes (kopējais skaits lapošanai)
        paginatedCards, // Lapotās kartītes (attēlošanai)
        paginatedArticles,
        paginatedVideos,
        activeFiltersList,
        handleRemoveFilter,
        handleClearAllActiveFilters,
        // ITEMS_PER_PAGE_OPTIONS tiek importēts tieši, nevis no hook
        ALL_THEMES_ID, // Importējam ALL_THEMES_ID arī šeit, ja nepieciešams
    } = useAppData();

    // Palīgfunkcija, lai iegūtu sadaļas nosaukumu (padara render bloku tīrāku)
    const getSectionTitle = (section) => {
        switch (section) {
            case 'home': return 'Sākums';
            case 'recommendations': return 'Ieteikumi';
            case 'association': return 'Biedrība';
            case 'trade': return 'Tirdzniecība';
            case 'stories': return 'Stāsti';
            case 'prints': return 'Izdrukām';
            case 'articles': return 'Raksti';
            case 'videos': return 'Video';
            case 'admin': return 'Pārvaldība';
            default: return '';
        }
    };

    return (
        <div className="App">
            <Header
                themes={themesData}
                activeTheme={activeTheme}
                onThemeSelect={setActiveTheme}
                onSectionSelect={setActiveSection}
                activeSection={activeSection}
            />
            <main>
                <h2 className="section-title">
                    {getSectionTitle(activeSection)}
                </h2>

                {/* Sākuma lapa */}
                {activeSection === 'home' && (
                    <HomePage
                        cards={paginatedCards}
                        onReadMore={handleReadMore}
                        availableAuthors={authors}
                        paginationProps={{
                            totalItems: finalFilteredCards.length,
                            itemsPerPage: cardsItemsPerPage,
                            currentPage: cardsCurrentPage,
                            onPageChange: setCardsCurrentPage,
                            onItemsPerPageChange: setCardsItemsPerPage,
                            itemsPerPageOptions: ITEMS_PER_PAGE_OPTIONS,
                        }}
                        homePageThemeDetail={currentThemeDetail}
                    />
                )}

                {/* Kartīšu lapas (Ieteikumi, Biedrība, Tirdzniecība, Stāsti, Izdrukām) */}
                {['recommendations', 'association', 'trade', 'stories', 'prints'].includes(activeSection) && (
                    <CardsPage
                        cards={{ rawCards: filteredCardsBase, paginated: paginatedCards }}
                        authors={authors}
                        themesData={themesData} // Šis prop joprojām tiek padots, jo CardsPage to izmanto citām vajadzībām
                        onReadMore={handleReadMore}
                        // filterTheme CardsPage iekšienē ir atkarīgs no tā, vai esam "Ieteikumi" sadaļā
                        filterTheme={activeSection === 'recommendations' ? filterTheme : currentThemeDetail?.id}
                        setFilterTheme={setFilterTheme}
                        filterAuthors={filterAuthors}
                        setFilterAuthors={setFilterAuthors}
                        selectedFilteredCardIds={selectedFilteredCardIds}
                        onToggleCardSelectionInFilter={handleToggleCardSelectionInFilter}
                        onClearCardSelections={() => setSelectedFilteredCardIds([])}
                        currentThemeSummary={currentThemeDetail?.summary || null}
                        // Filtrējam tēmas CardFilter akordeonam tikai "Ieteikumi" sadaļā
                        allThemesData={activeSection === 'recommendations' ? themesData.filter(t => ![1, ALL_THEMES_ID, 104, 105, 106, 107, 108, 109].includes(t.id)) : []}
                        isFilterModalOpen={isFilterModalOpen}
                        setIsFilterModalOpen={setIsFilterModalOpen}
                        activeFiltersList={activeFiltersList}
                        handleRemoveFilter={handleRemoveFilter}
                        handleClearAllActiveFilters={handleClearAllActiveFilters}
                        paginationProps={{
                            totalItems: finalFilteredCards.length,
                            itemsPerPage: cardsItemsPerPage,
                            currentPage: cardsCurrentPage,
                            onPageChange: setCardsCurrentPage,
                            onItemsPerPageChange: setCardsItemsPerPage,
                            itemsPerPageOptions: ITEMS_PER_PAGE_OPTIONS,
                        }}
                        currentThemeDetail={currentThemeDetail}
                    />
                )}

                {/* Rakstu lapa */}
                {activeSection === 'articles' && (
                    <ArticlesPage
                        articles={paginatedArticles}
                        availableAuthors={authors}
                        paginationProps={{
                            totalItems: articles.length,
                            itemsPerPage: articlesItemsPerPage,
                            currentPage: articlesCurrentPage,
                            onPageChange: setArticlesCurrentPage,
                            onItemsPerPageChange: setArticlesItemsPerPage,
                            itemsPerPageOptions: ITEMS_PER_PAGE_OPTIONS,
                        }}
                        pageThemeDetail={currentThemeDetail}
                    />
                )}

                {/* Video lapa */}
                {activeSection === 'videos' && (
                    <VideosPage
                        videos={paginatedVideos}
                        availableAuthors={authors}
                        paginationProps={{
                            totalItems: videos.length,
                            itemsPerPage: videosItemsPerPage,
                            currentPage: videosCurrentPage,
                            onPageChange: setVideosCurrentPage,
                            onItemsPerPageChange: setVideosItemsPerPage,
                            itemsPerPageOptions: ITEMS_PER_PAGE_OPTIONS,
                        }}
                        pageThemeDetail={currentThemeDetail}
                    />
                )}

                {/* Admin lapa */}
                {activeSection === 'admin' && (
                    <AdminPage
                        authors={authors}
                        themes={themesData}
                        cards={cards}
                        articles={articles}
                        videos={videos}
                        setAuthors={setAuthors}
                        setThemesData={setThemesData}
                        setCards={setCards}
                        setArticles={setArticles}
                        setVideos={setVideos}
                    />
                )}
            </main>

            <Footer />

            {/* Kartītes detaļu modālais logs */}
            {selectedCard && (
                <Suspense fallback={<div>Ielādē kartītes detaļas...</div>}>
                    <LazyCardDetailModal
                        card={selectedCard}
                        onClose={handleCloseModal}
                    />
                </Suspense>
            )}
        </div>
    );
}

export default App;
// src/App.jsx
import React, { useState, useMemo, useEffect, lazy, Suspense, useCallback } from 'react';
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

// Importējam pielāgotos āķus
import { useData } from './hooks/useData';
import { useFilters } from './hooks/useFilters';
import { usePagination } from './hooks/usePagination';

const LazyCardDetailModal = lazy(() => import('/src/components/common/Modals/CardDetailModal/CardDetailModal'));

function App() {
  const { authors, setAuthors, themesData, setThemesData, cards, setCards, articles, setArticles, videos, setVideos } = useData();
  
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [activeTheme, setActiveTheme] = useState(1);

  const {
    filterTheme,
    setFilterTheme,
    filterAuthors,
    setFilterAuthors,
    selectedFilteredCardIds,
    isFilterModalOpen,
    setIsFilterModalOpen,
    handleToggleCardSelectionInFilter,
    handleClearCardSelections,
    handleRemoveFilter,
    handleClearAllActiveFilters,
    activeFiltersList,
    resetFilters,
  } = useFilters(activeTheme);
  
  const filteredCardsBase = useMemo(() => {
    const safeCards = Array.isArray(cards) ? cards : [];
    const safeAuthors = Array.isArray(authors) ? authors : [];
    const safeThemes = Array.isArray(themesData) ? themesData : [];
    return safeCards.filter(card => {
      let themeId;
      switch (activeSection) {
        case 'home': themeId = 1; break;
        case 'recommendations': themeId = filterTheme; break;
        case 'association': themeId = 104; break;
        case 'trade': themeId = 105; break;
        case 'stories': themeId = 106; break;
        case 'prints': themeId = 107; break;
        default: return false;
      }
      
      const matchesTheme = (themeId === 'all') ? [100, 101, 102, 103].includes(card.theme) : card.theme === themeId;
      const matchesAuthors = filterAuthors.length === 0 || filterAuthors.includes(card.authorId);
      
      return matchesTheme && matchesAuthors;
    })
    .map(card => {
      const cardAuthor = safeAuthors.find(a => a.id === card.authorId);
      const cardThemeData = safeThemes.find(t => t.id === card.theme);
      return {
        ...card,
        authorName: cardAuthor ? cardAuthor.name : 'Nezināms autors',
        themeSummary: cardThemeData ? cardThemeData.summary : 'Nav kopsavilkuma',
        themeName: cardThemeData ? cardThemeData.name : 'Nezināma tēma',
      };
    });
  }, [cards, activeSection, filterTheme, filterAuthors, authors, themesData]);

  const finalFilteredCards = useMemo(() => {
    if (selectedFilteredCardIds.length > 0) {
      return filteredCardsBase.filter(card => selectedFilteredCardIds.includes(card.id));
    }
    return filteredCardsBase;
  }, [filteredCardsBase, selectedFilteredCardIds]);
  
  const { paginatedData: paginatedCards, paginationProps: cardsPaginationProps, resetPagination: resetCardsPagination } = usePagination(finalFilteredCards);
  const { paginatedData: paginatedArticles, paginationProps: articlesPaginationProps, resetPagination: resetArticlesPagination } = usePagination(articles);
  const { paginatedData: paginatedVideos, paginationProps: videosPaginationProps, resetPagination: resetVideosPagination } = usePagination(videos);

  useEffect(() => {
    resetCardsPagination();
    resetArticlesPagination();
    resetVideosPagination();
    
    let newTheme;
    switch (activeSection) {
      case 'home': newTheme = 1; break;
      case 'recommendations': newTheme = 'all'; break;
      case 'association': newTheme = 104; break;
      case 'trade': newTheme = 105; break;
      case 'stories': newTheme = 106; break;
      case 'prints': newTheme = 107; break;
      case 'articles': newTheme = 108; break;
      case 'videos': newTheme = 109; break;
      default: newTheme = ''; break;
    }
    setActiveTheme(newTheme);
    resetFilters(newTheme);

  }, [activeSection, resetFilters, resetCardsPagination, resetArticlesPagination, resetVideosPagination]);

  useEffect(() => {
    if (activeSection === 'recommendations' && activeTheme !== filterTheme) {
        setFilterTheme(activeTheme);
        setFilterAuthors([]);
        handleClearCardSelections();
    }
  }, [activeSection, activeTheme, filterTheme, setFilterTheme, setFilterAuthors, handleClearCardSelections]);

  const handleReadMore = useCallback((card) => {
    const safeAuthors = Array.isArray(authors) ? authors : [];
    const cardAuthor = safeAuthors.find(a => a.id === card.authorId);
    const updatedImages = card.images.map(img => {
        const imgAuthor = safeAuthors.find(a => a.id === img.authorId);
        return {
          ...img,
          authorName: imgAuthor ? imgAuthor.name : 'Nezināms autors'
        };
    });

    setSelectedCard({
      ...card,
      authorName: cardAuthor ? cardAuthor.name : 'Nezināms autors',
      images: updatedImages,
      allAuthors: safeAuthors
    });
  }, [authors]);

  const handleCloseModal = useCallback(() => {
    setSelectedCard(null);
  }, []);

  const currentThemeDetail = useMemo(() => {
    const safeThemes = Array.isArray(themesData) ? themesData : [];
    let themeId;
    switch (activeSection) {
        case 'home': themeId = 1; break;
        case 'recommendations': themeId = filterTheme; break;
        case 'association': themeId = 104; break;
        case 'trade': themeId = 105; break;
        case 'stories': themeId = 106; break;
        case 'prints': themeId = 107; break;
        case 'articles': themeId = 108; break;
        case 'videos': themeId = 109; break;
        default: return null;
    }
    return themeId !== 'all' ? safeThemes.find(t => t.id === themeId) : null;
  }, [activeSection, themesData, filterTheme]);
  
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
            {activeSection === 'home' && 'Sākums'}
            {activeSection === 'recommendations' && 'Ieteikumi'}
            {activeSection === 'association' && 'Biedrība'}
            {activeSection === 'trade' && 'Tirdzniecība'}
            {activeSection === 'stories' && 'Stāsti'}
            {activeSection === 'prints' && 'Izdrukām'}
            {activeSection === 'articles' && 'Raksti'}
            {activeSection === 'videos' && 'Video'}
            {activeSection === 'admin' && 'Pārvaldība'}
          </h2>

          {activeSection === 'home' && (
            <HomePage
              cards={paginatedCards}
              onReadMore={handleReadMore}
              availableAuthors={authors}
              paginationProps={cardsPaginationProps}
              homePageThemeDetail={currentThemeDetail}
            />
          )}

          {(activeSection === 'recommendations' || activeSection === 'association' || activeSection === 'trade' || activeSection === 'stories' || activeSection === 'prints') && (
            <CardsPage
              cards={{rawCards: filteredCardsBase, paginated: paginatedCards}}
              authors={authors}
              themesData={themesData}
              onReadMore={handleReadMore}
              filterTheme={filterTheme}
              setFilterTheme={setFilterTheme}
              filterAuthors={filterAuthors}
              setFilterAuthors={setFilterAuthors}
              selectedFilteredCardIds={selectedFilteredCardIds}
              onToggleCardSelectionInFilter={handleToggleCardSelectionInFilter}
              onClearCardSelections={handleClearCardSelections}
              currentThemeSummary={currentThemeDetail?.summary || null}
              allThemesData={themesData.filter(t => ![1, 'all', 104, 105, 106, 107, 108, 109].includes(t.id))}
              isFilterModalOpen={isFilterModalOpen}
              setIsFilterModalOpen={setIsFilterModalOpen}
              activeFiltersList={activeFiltersList(themesData, authors, activeSection)}
              handleRemoveFilter={(filter) => handleRemoveFilter(filter, setActiveTheme)}
              handleClearAllActiveFilters={() => handleClearAllActiveFilters(setActiveTheme)}
              paginationProps={cardsPaginationProps}
              currentThemeDetail={currentThemeDetail}
            />
          )}

          {activeSection === 'articles' && (
            <ArticlesPage
              articles={paginatedArticles}
              availableAuthors={authors}
              paginationProps={articlesPaginationProps}
              pageThemeDetail={currentThemeDetail}
            />
          )}

          {activeSection === 'videos' && (
            <VideosPage
              videos={paginatedVideos}
              availableAuthors={authors}
              paginationProps={videosPaginationProps}
              pageThemeDetail={currentThemeDetail}
            />
          )}

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
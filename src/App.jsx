// src/App.jsx
import React, { useState, useMemo, useEffect, lazy, Suspense, useCallback } from 'react';
import './App.css';

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import PageRenderer from './components/common/PageRenderer';

import { useData } from './hooks/useData';
import { useFilters } from './hooks/useFilters';
import { usePagination } from './hooks/usePagination';
import * as api from './api'; // Importējam API funkcijas priekš pieteikšanās (tikai loginAdmin)

const LazyCardDetailModal = lazy(() => import('./components/common/Modals/CardDetailModal/CardDetailModal'));
const LazyInfoModal = lazy(() => import('./components/common/Modals/InfoModal'));

function App() {
  // LABOTS: Iegūstam tikai nepieciešamos datus un jaunos CRUD funkcijas no useData
  const { authors, themesData, cards, articles, videos, addEntity, updateEntity, deleteEntity } = useData();
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [activeTheme, setActiveTheme] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken')); // Autentifikācijas stāvoklis

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
    if (activeSection === 'admin') {
        return cards;
    }

    return cards.filter(card => {
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
    });
  }, [cards, activeSection, filterTheme, filterAuthors]);

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
    
    if (activeSection === 'recommendations') {
        return;
    }
    
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

  const openModal = useCallback((item, type) => {
    setSelectedItem(item);
    setModalType(type);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
    setModalType(null);
  }, []);
  
  // Pieteikšanās loģika (pārvietota no Header, lai pārvaldītu isLoggedIn stāvokli centrāli)
  const handleLogin = useCallback(async (username, password) => {
    try {
      const response = await api.loginAdmin({ username, password });
      localStorage.setItem('adminToken', response.token); // Saglabā tokenu
      setIsLoggedIn(true); // Atjaunina pieteikšanās statusu
      setActiveSection('admin'); // Uzreiz pāriet uz administrācijas paneli
      return { success: true };
    } catch (error) {
      console.error('Pieteikšanās kļūda:', error);
      return { success: false, message: error.message || 'Pieteikšanās neizdevās.' };
    }
  }, []);

  // Iziet no sistēmas loģika
  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminToken'); // Izdzēš tokenu
    setIsLoggedIn(false); // Atjaunina pieteikšanās statusu
    setActiveSection('home'); // Pāriet uz sākumlapu
    alert('Jūs esat izrakstījies.');
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
  
  const pageProps = {
    home: { cards: paginatedCards, onReadMore: (item) => openModal(item, 'card'), availableAuthors: authors, paginationProps: cardsPaginationProps, homePageThemeDetail: currentThemeDetail },
    cards: {
      cards: {rawCards: filteredCardsBase, paginated: paginatedCards},
      authors: authors,
      themesData: themesData,
      onReadMore: (item) => openModal(item, 'card'),
      filterTheme: filterTheme,
      setFilterTheme: setFilterTheme,
      filterAuthors: filterAuthors,
      setFilterAuthors: setFilterAuthors,
      selectedFilteredCardIds: selectedFilteredCardIds,
      onToggleCardSelectionInFilter: handleToggleCardSelectionInFilter,
      onClearCardSelections: handleClearCardSelections,
      currentThemeSummary: currentThemeDetail?.summary || null,
      allThemesData: themesData.filter(t => ![1, 'all', 104, 105, 106, 107, 108, 109].includes(t.id)),
      isFilterModalOpen: isFilterModalOpen,
      setIsFilterModalOpen: setIsFilterModalOpen,
      activeFiltersList: activeFiltersList(themesData, authors, activeSection),
      handleRemoveFilter: (filter) => handleRemoveFilter(filter, setActiveTheme),
      handleClearAllActiveFilters: () => handleClearAllActiveFilters(setActiveTheme),
      paginationProps: cardsPaginationProps,
      currentThemeDetail: currentThemeDetail,
    },
    articles: { articles: paginatedArticles, availableAuthors: authors, paginationProps: articlesPaginationProps, pageThemeDetail: currentThemeDetail, onReadMore: (item) => openModal(item, 'rakstu') },
    videos: { videos: paginatedVideos, availableAuthors: authors, paginationProps: videosPaginationProps, pageThemeDetail: currentThemeDetail, onReadMore: (item) => openModal(item, 'video') },
    // LABOTS: Nododam jaunas CRUD funkcijas uz AdminPage, kā arī isLoggedIn statusu
    admin: { authors, themes: themesData, cards, articles, videos, addEntity, updateEntity, deleteEntity, openModal: openModal, isLoggedIn: isLoggedIn }
  };

  return (
    <div className="App">
      {/* Nododam isLoggedIn, handleLogin un handleLogout uz Header */}
      <Header
        themes={themesData}
        activeTheme={activeTheme}
        onThemeSelect={setActiveTheme}
        onSectionSelect={setActiveSection}
        activeSection={activeSection}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin} // Jaunā pieteikšanās funkcija
        onLogout={handleLogout} // Jaunā iziešanas funkcija
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
          <PageRenderer activeSection={activeSection} {...pageProps} />
      </main>
      <Footer />
      {selectedItem && (
        <Suspense fallback={<div>Ielādē...</div>}>
          {modalType === 'card' && <LazyCardDetailModal card={selectedItem} onClose={handleCloseModal} />}
          {['autoru', 'tēmu', 'rakstu', 'video'].includes(modalType) && <LazyInfoModal item={selectedItem} type={modalType} onClose={handleCloseModal} />}
        </Suspense>
      )}
    </div>
  );
}

export default App;
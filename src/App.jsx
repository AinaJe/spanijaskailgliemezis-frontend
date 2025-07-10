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

// Importējam simulētos datus (VISI dati tagad nāk no simulācijām)
import { simulatedAuthors } from './data/simulatedAuthors';
import { simulatedThemesData } from './data/simulatedThemesData';
import { simulatedCards } from './data/simulatedCards';
import { simulatedArticles } from './data/simulatedArticles';
import { simulatedVideos } from './data/simulatedVideos';

// Dinamiski ielādējam CardDetailModal
const LazyCardDetailModal = lazy(() => import('/src/components/common/Modals/CardDetailModal/CardDetailModal'));

// Lapošanas opcijas
const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100, Infinity];

function App() {
  const [authors, setAuthors] = useState([]);
  const [themesData, setThemesData] = useState([]);
  const [cards, setCards] = useState([]);
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  // Filtru stāvokļi
  const [activeTheme, setActiveTheme] = useState(1); // ID 1 ir "Sākums"
  const [filterTheme, setFilterTheme] = useState(1); // ID 1 ir "Sākums"
  const [filterAuthors, setFilterAuthors] = useState([]);
  const [selectedFilteredCardIds, setSelectedFilteredCardIds] = useState([]);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Lapošanas stāvokļi
  const [cardsCurrentPage, setCardsCurrentPage] = useState(1);
  const [cardsItemsPerPage, setCardsItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[2]);

  const [articlesCurrentPage, setArticlesCurrentPage] = useState(1);
  const [articlesItemsPerPage, setArticlesItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[2]);

  const [videosCurrentPage, setVideosCurrentPage] = useState(1);
  const [videosItemsPerPage, setVideosItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[2]);


  // Sākotnējā datu ielāde no simulētajiem failiem
  useEffect(() => {
    console.log('Simulē datu ielādi...');
    
    setAuthors(simulatedAuthors);
    
    // Papildinām simulētās tēmas ar Sākums un Visas
    const initialThemes = [
        { id: 1, name: 'Sākums', summary: 'Laipni lūdzam mūsu mājaslapā! Šeit atradīsiet jaunāko un aktuālāko informāciju.', description: '<p>Esiet sveicināti mūsu digitālajā centrā! Mēs esam priecīgi dalīties ar jums jaunākajām <b>kartītēm</b>, <b>rakstiem</b> un <b>video</b>, kas aptver dažādas aizraujošas tēmas. Izpētiet mūsu saturu un atklājiet jaunas zināšanas!</p>' },
        { id: 'all', name: 'Visas', summary: 'Visas kartītes kopā, neatkarīgi no tēmas.', description: '<p>Šeit ir redzami visi mūsu pieejamie kartīšu ieraksti, neatkarīgi no tēmas.</p>' }, // ID mainīts uz 'all'
        ...(Array.isArray(simulatedThemesData) ? simulatedThemesData : []) // Nodrošinām, ka tas ir masīvs
    ];
    setThemesData(initialThemes);

    setCards(simulatedCards);
    setArticles(simulatedArticles);
    setVideos(simulatedVideos);
    console.log('Dati veiksmīgi ielādēti (simulācija)!');
  }, []);


  // useEffect hook, lai atiestatītu filtrus un lapošanu, mainot sadaļu
  useEffect(() => {
    setCardsCurrentPage(1);
    setArticlesCurrentPage(1);
    setVideosCurrentPage(1);

    setFilterAuthors([]);
    setSelectedFilteredCardIds([]);

    switch (activeSection) {
      case 'home':
        setActiveTheme(1);
        setFilterTheme(1);
        break;
      case 'recommendations':
        setActiveTheme('all');
        setFilterTheme('all');
        break;
      case 'association':
        setActiveTheme(104);
        setFilterTheme(104);
        break;
      case 'trade':
        setActiveTheme(105);
        setFilterTheme(105);
        break;
      case 'stories':
        setActiveTheme(106);
        setFilterTheme(106);
        break;
      case 'prints':
        setActiveTheme(107);
        setFilterTheme(107);
        break;
      case 'articles':
        setActiveTheme(108);
        setFilterTheme(108);
        break;
      case 'videos':
        setActiveTheme(109);
        setFilterTheme(109);
        break;
      case 'admin':
      default:
        setActiveTheme('');
        setFilterTheme('');
        break;
    }
  }, [activeSection]);

  // useEffect hook, lai sinhronizētu filterTheme ar activeTheme, ja mainās activeTheme un sadaļa ir "Ieteikumi"
  useEffect(() => {
    if (activeSection === 'recommendations') { // Pārbaudām, vai esam "Ieteikumi" sadaļā
      if (activeTheme !== filterTheme) {
        setFilterTheme(activeTheme);
        // JAUNS: Notīrām autoru un atlasītās kartītes, mainot tēmu "Ieteikumi" sadaļā
        setFilterAuthors([]);
        setSelectedFilteredCardIds([]);
      }
    }
  }, [activeTheme, activeSection, filterTheme]);


  // handleReadMore funkcija
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

  // handleCloseModal funkcija
  const handleCloseModal = useCallback(() => {
    setSelectedCard(null);
  }, []);

  // handleToggleCardSelectionInFilter funkcija
  const handleToggleCardSelectionInFilter = useCallback((cardId) => {
    setSelectedFilteredCardIds(prevSelected =>
      prevSelected.includes(cardId)
        ? prevSelected.filter(id => id !== cardId)
        : [...prevSelected, cardId]
    );
  }, []);

  // currentThemeDetail useMemo
  const currentThemeDetail = useMemo(() => {
    const safeThemes = Array.isArray(themesData) ? themesData : [];
    switch (activeSection) {
      case 'home': {
        return safeThemes.find(t => t.id === 1);
      }
      case 'recommendations': {
        return filterTheme !== 'all' ? safeThemes.find(theme => theme.id === filterTheme) : null;
      }
      case 'association': {
        return safeThemes.find(t => t.id === 104);
      }
      case 'trade': {
        return safeThemes.find(t => t.id === 105);
      }
      case 'stories': {
        return safeThemes.find(t => t.id === 106);
      }
      case 'prints': {
        return safeThemes.find(t => t.id === 107);
      }
      case 'articles': {
        return safeThemes.find(t => t.id === 108);
      }
      case 'videos': {
        return safeThemes.find(t => t.id === 109);
      }
      default: {
        return null;
      }
    }
  }, [activeSection, themesData, filterTheme]);

  // filteredCardsBase useMemo
  const filteredCardsBase = useMemo(() => {
    const safeCards = Array.isArray(cards) ? cards : [];
    const safeAuthors = Array.isArray(authors) ? authors : [];
    const safeThemes = Array.isArray(themesData) ? themesData : [];
    return safeCards.filter(card => {
      switch (activeSection) {
        case 'home': {
          return card.theme === 1;
        }
        case 'recommendations': {
          const recommendationsSectionThemeIds = [100, 101, 102, 103];
          const isCardInRecommendationsSectionThemes = recommendationsSectionThemeIds.includes(card.theme);

          const matchesTheme = (filterTheme === 'all' && isCardInRecommendationsSectionThemes) ||
                                 (filterTheme !== 'all' && card.theme === filterTheme);

          const matchesAuthors = filterAuthors.length === 0 || filterAuthors.includes(card.authorId);
          return matchesTheme && matchesAuthors;
        }
        case 'association': {
          return card.theme === 104;
        }
        case 'trade': {
          return card.theme === 105;
        }
        case 'stories': {
          return card.theme === 106;
        }
        case 'prints': {
          return card.theme === 107;
        }
        default: {
          return false;
        }
      }
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

  // finalFilteredCards useMemo
  const finalFilteredCards = useMemo(() => {
    if (selectedFilteredCardIds.length > 0) {
      return filteredCardsBase.filter(card => selectedFilteredCardIds.includes(card.id));
    }
    return filteredCardsBase;
  }, [filteredCardsBase, selectedFilteredCardIds]);

  // Lapošanas loģika kartītēm
  const paginatedCards = useMemo(() => {
    if (cardsItemsPerPage === Infinity) return finalFilteredCards;
    const startIndex = (cardsCurrentPage - 1) * cardsItemsPerPage;
    const endIndex = startIndex + cardsItemsPerPage;
    return finalFilteredCards.slice(startIndex, endIndex);
  }, [finalFilteredCards, cardsCurrentPage, cardsItemsPerPage]);

  // Lapošanas loģika rakstiem
  const paginatedArticles = useMemo(() => {
    const safeArticles = Array.isArray(articles) ? articles : [];
    if (articlesItemsPerPage === Infinity) return safeArticles;
    const startIndex = (articlesCurrentPage - 1) * articlesItemsPerPage;
    const endIndex = startIndex + articlesItemsPerPage;
    return safeArticles.slice(startIndex, endIndex);
  }, [articles, articlesCurrentPage, articlesItemsPerPage]);

  // Lapošanas loģika video
  const paginatedVideos = useMemo(() => {
    const safeVideos = Array.isArray(videos) ? videos : [];
    if (videosItemsPerPage === Infinity) return safeVideos;
    const startIndex = (videosCurrentPage - 1) * videosItemsPerPage;
    const endIndex = startIndex + videosItemsPerPage;
    return safeVideos.slice(startIndex, endIndex);
  }, [videos, videosCurrentPage, videosItemsPerPage]);


  // activeFiltersList useMemo
  const activeFiltersList = useMemo(() => {
    const filters = [];
    const safeThemes = Array.isArray(themesData) ? themesData : [];
    const safeAuthors = Array.isArray(authors) ? authors : [];
    if (activeSection === 'recommendations') {
      if (filterTheme !== 'all') {
        const themeName = safeThemes.find(t => t.id === filterTheme)?.name || filterTheme;
        filters.push({ type: 'theme', value: themeName, id: filterTheme });
      }
      filterAuthors.forEach(authorId => {
          const authorName = safeAuthors.find(a => a.id === authorId)?.name || authorId;
          filters.push({ type: 'author', value: authorName, id: authorId });
      });
      if (selectedFilteredCardIds.length > 0) {
          filters.push({ type: 'selectedCards', value: `${selectedFilteredCardIds.length} kartītes`, id: 'selectedCards' });
      }
    }
    return filters;
  }, [filterTheme, filterAuthors, selectedFilteredCardIds, themesData, authors, activeSection]);

  // handleRemoveFilter funkcija
  const handleRemoveFilter = useCallback((filter) => {
    if (filter.type === 'theme') {
      setFilterTheme('all');
      setActiveTheme('all');
    } else if (filter.type === 'author') {
      setFilterAuthors(prev => prev.filter(id => id !== filter.id));
    } else if (filter.type === 'selectedCards') {
        setSelectedFilteredCardIds([]);
    }
  }, []);

  // handleClearAllActiveFilters funkcija
  const handleClearAllActiveFilters = useCallback(() => {
    setFilterTheme('all');
    setFilterAuthors([]);
    setSelectedFilteredCardIds([]);
    setActiveTheme('all');
  }, []);

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

          {activeSection === 'recommendations' && (
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
              onClearCardSelections={() => setSelectedFilteredCardIds([])}
              currentThemeSummary={currentThemeDetail?.summary || null}
              allThemesData={themesData.filter(t => ![1, 'all', 104, 105, 106, 107, 108, 109].includes(t.id))}
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

          {activeSection === 'association' && (
            <CardsPage
              cards={{rawCards: filteredCardsBase, paginated: paginatedCards}}
              authors={authors}
              themesData={themesData}
              onReadMore={handleReadMore}
              filterTheme={104}
              setFilterTheme={setFilterTheme}
              filterAuthors={filterAuthors}
              setFilterAuthors={setFilterAuthors}
              selectedFilteredCardIds={selectedFilteredCardIds}
              onToggleCardSelectionInFilter={handleToggleCardSelectionInFilter}
              onClearCardSelections={() => setSelectedFilteredCardIds([])}
              currentThemeSummary={currentThemeDetail?.summary || null}
              allThemesData={[]}
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

          {activeSection === 'trade' && (
            <CardsPage
              cards={{rawCards: filteredCardsBase, paginated: paginatedCards}}
              authors={authors}
              themesData={themesData}
              onReadMore={handleReadMore}
              filterTheme={105}
              setFilterTheme={setFilterTheme}
              filterAuthors={filterAuthors}
              setFilterAuthors={setFilterAuthors}
              selectedFilteredCardIds={selectedFilteredCardIds}
              onToggleCardSelectionInFilter={handleToggleCardSelectionInFilter}
              onClearCardSelections={() => setSelectedFilteredCardIds([])}
              currentThemeSummary={currentThemeDetail?.summary || null}
              allThemesData={[]}
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

          {activeSection === 'stories' && (
            <CardsPage
              cards={{rawCards: filteredCardsBase, paginated: paginatedCards}}
              authors={authors}
              themesData={themesData}
              onReadMore={handleReadMore}
              filterTheme={106}
              setFilterTheme={setFilterTheme}
              filterAuthors={filterAuthors}
              setFilterAuthors={setFilterAuthors}
              selectedFilteredCardIds={selectedFilteredCardIds}
              onToggleCardSelectionInFilter={handleToggleCardSelectionInFilter}
              onClearCardSelections={() => setSelectedFilteredCardIds([])}
              currentThemeSummary={currentThemeDetail?.summary || null}
              allThemesData={[]}
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

          {activeSection === 'prints' && (
            <CardsPage
              cards={{rawCards: filteredCardsBase, paginated: paginatedCards}}
              authors={authors}
              themesData={themesData}
              onReadMore={handleReadMore}
              filterTheme={107}
              setFilterTheme={setFilterTheme}
              filterAuthors={filterAuthors}
              setFilterAuthors={setFilterAuthors}
              selectedFilteredCardIds={selectedFilteredCardIds}
              onToggleCardSelectionInFilter={handleToggleCardSelectionInFilter}
              onClearCardSelections={() => setSelectedFilteredCardIds([])}
              currentThemeSummary={currentThemeDetail?.summary || null}
              allThemesData={[]}
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
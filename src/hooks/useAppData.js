// src/hooks/useAppData.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { simulatedAuthors } from '../data/simulatedAuthors';
import { simulatedThemesData } from '../data/simulatedThemesData';
import { simulatedCards } from '../data/simulatedCards';
import { simulatedArticles } from '../data/simulatedArticles';
import { simulatedVideos } from '../data/simulatedVideos';

// Eksportējam lapošanas opcijas un "Visas" tēmas ID kā konstantes
export const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100, Infinity];
export const ALL_THEMES_ID = 'all'; // Definējam konstanti "Visas" tēmas ID

const useAppData = () => {
    // Datu stāvokļi
    const [authors, setAuthors] = useState([]);
    const [themesData, setThemesData] = useState([]);
    const [cards, setCards] = useState([]);
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);

    // UI un navigācijas stāvokļi
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
    const [cardsItemsPerPage, setCardsItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[2]); // Sākotnēji 20 kartītes
    const [articlesCurrentPage, setArticlesCurrentPage] = useState(1);
    const [articlesItemsPerPage, setArticlesItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[2]); // Sākotnēji 20 raksti
    const [videosCurrentPage, setVideosCurrentPage] = useState(1);
    const [videosItemsPerPage, setVideosItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[2]); // Sākotnēji 20 video

    // Sākotnējā datu ielāde no simulētajiem failiem
    useEffect(() => {
        console.log('Simulē datu ielādi...');

        setAuthors(simulatedAuthors);

        // Papildinām simulētās tēmas ar Sākums un Visas
        const initialThemes = [
            { id: 1, name: 'Sākums', summary: 'Laipni lūdzam mūsu mājaslapā! Šeit atradīsiet jaunāko un aktuālāko informāciju.', description: '<p>Esiet sveicināti mūsu digitālajā centrā! Mēs esam priecīgi dalīties ar jums jaunākajām <b>kartītēm</b>, <b>rakstiem</b> un <b>video</b>, kas aptver dažādas aizraujošas tēmas. Izpētiet mūsu saturu un atklājiet jaunas zināšanas!</p>' },
            { id: ALL_THEMES_ID, name: 'Visas', summary: 'Visas kartītes kopā, neatkarīgi no tēmas.', description: '<p>Šeit ir redzami visi mūsu pieejamie kartīšu ieraksti, neatkarīgi no tēmas.</p>' },
            ...(Array.isArray(simulatedThemesData) ? simulatedThemesData : []) // Nodrošinām, ka tas ir masīvs
        ];
        setThemesData(initialThemes);

        setCards(simulatedCards);
        setArticles(simulatedArticles);
        setVideos(simulatedVideos);
        console.log('Dati veiksmīgi ielādēti (simulācija)!');
    }, []); // Tukšs atkarību masīvs nodrošina izpildi tikai reizi

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
                setActiveTheme(ALL_THEMES_ID);
                setFilterTheme(ALL_THEMES_ID);
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
                // Notīrām autoru un atlasītās kartītes, mainot tēmu "Ieteikumi" sadaļā
                setFilterAuthors([]);
                setSelectedFilteredCardIds([]);
            }
        }
    }, [activeTheme, activeSection, filterTheme]);

    // Funkcija kartītes detaļu modalā loga atvēršanai
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

    // Funkcija kartītes detaļu modalā loga aizvēršanai
    const handleCloseModal = useCallback(() => {
        setSelectedCard(null);
    }, []);

    // Funkcija kartītes atlasei/atcelšanai filtrā
    const handleToggleCardSelectionInFilter = useCallback((cardId) => {
        setSelectedFilteredCardIds(prevSelected =>
            prevSelected.includes(cardId)
                ? prevSelected.filter(id => id !== cardId)
                : [...prevSelected, cardId]
        );
    }, []);

    // Iegūst pašreizējās tēmas detaļas (Memoizēts)
    const currentThemeDetail = useMemo(() => {
        const safeThemes = Array.isArray(themesData) ? themesData : [];
        switch (activeSection) {
            case 'home': return safeThemes.find(t => t.id === 1);
            case 'recommendations': return filterTheme !== ALL_THEMES_ID ? safeThemes.find(theme => theme.id === filterTheme) : null;
            case 'association': return safeThemes.find(t => t.id === 104);
            case 'trade': return safeThemes.find(t => t.id === 105);
            case 'stories': return safeThemes.find(t => t.id === 106);
            case 'prints': return safeThemes.find(t => t.id === 107);
            case 'articles': return safeThemes.find(t => t.id === 108);
            case 'videos': return safeThemes.find(t => t.id === 109);
            default: return null;
        }
    }, [activeSection, themesData, filterTheme]);

    // Bāzes filtrētās kartītes pirms papildu atlases un lapošanas (Memoizēts)
    const filteredCardsBase = useMemo(() => {
        const safeCards = Array.isArray(cards) ? cards : [];
        const safeAuthors = Array.isArray(authors) ? authors : [];
        const safeThemes = Array.isArray(themesData) ? themesData : [];
        return safeCards.filter(card => {
            switch (activeSection) {
                case 'home':
                    return card.theme === 1;
                case 'recommendations': { // Izmantojam bloka tvērumu priekš const deklarācijām
                    const recommendationsSectionThemeIds = [100, 101, 102, 103];
                    const isCardInRecommendationsSectionThemes = recommendationsSectionThemeIds.includes(card.theme);

                    const matchesTheme = (filterTheme === ALL_THEMES_ID && isCardInRecommendationsSectionThemes) ||
                                         (filterTheme !== ALL_THEMES_ID && card.theme === filterTheme);

                    const matchesAuthors = filterAuthors.length === 0 || filterAuthors.includes(card.authorId);
                    return matchesTheme && matchesAuthors;
                }
                case 'association':
                    return card.theme === 104;
                case 'trade':
                    return card.theme === 105;
                case 'stories':
                    return card.theme === 106;
                case 'prints':
                    return card.theme === 107;
                default:
                    return false;
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

    // Galīgās filtrētās kartītes, ņemot vērā arī atlasītās kartītes (Memoizēts)
    const finalFilteredCards = useMemo(() => {
        if (selectedFilteredCardIds.length > 0) {
            return filteredCardsBase.filter(card => selectedFilteredCardIds.includes(card.id));
        }
        return filteredCardsBase;
    }, [filteredCardsBase, selectedFilteredCardIds]);

    // Lapošanas loģika kartītēm (Memoizēts)
    const paginatedCards = useMemo(() => {
        if (cardsItemsPerPage === Infinity) return finalFilteredCards;
        const startIndex = (cardsCurrentPage - 1) * cardsItemsPerPage;
        const endIndex = startIndex + cardsItemsPerPage;
        return finalFilteredCards.slice(startIndex, endIndex);
    }, [finalFilteredCards, cardsCurrentPage, cardsItemsPerPage]);

    // Lapošanas loģika rakstiem (Memoizēts)
    const paginatedArticles = useMemo(() => {
        const safeArticles = Array.isArray(articles) ? articles : [];
        if (articlesItemsPerPage === Infinity) return safeArticles;
        const startIndex = (articlesCurrentPage - 1) * articlesItemsPerPage;
        const endIndex = startIndex + articlesItemsPerPage;
        return safeArticles.slice(startIndex, endIndex);
    }, [articles, articlesCurrentPage, articlesItemsPerPage]);

    // Lapošanas loģika video (Memoizēts)
    const paginatedVideos = useMemo(() => {
        const safeVideos = Array.isArray(videos) ? videos : [];
        if (videosItemsPerPage === Infinity) return safeVideos;
        const startIndex = (videosCurrentPage - 1) * videosItemsPerPage;
        const endIndex = startIndex + videosItemsPerPage;
        return safeVideos.slice(startIndex, endIndex);
    }, [videos, videosCurrentPage, videosItemsPerPage]);

    // Aktīvo filtru saraksts displejam (Memoizēts)
    const activeFiltersList = useMemo(() => {
        const filters = [];
        const safeThemes = Array.isArray(themesData) ? themesData : [];
        const safeAuthors = Array.isArray(authors) ? authors : [];
        if (activeSection === 'recommendations') {
            if (filterTheme !== ALL_THEMES_ID) {
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

    // Funkcija filtra noņemšanai
    const handleRemoveFilter = useCallback((filter) => {
        if (filter.type === 'theme') {
            setFilterTheme(ALL_THEMES_ID);
            setActiveTheme(ALL_THEMES_ID);
        } else if (filter.type === 'author') {
            setFilterAuthors(prev => prev.filter(id => id !== filter.id));
        } else if (filter.type === 'selectedCards') {
            setSelectedFilteredCardIds([]);
        }
    }, []);

    // Funkcija visu aktīvo filtru notīrīšanai
    const handleClearAllActiveFilters = useCallback(() => {
        setFilterTheme(ALL_THEMES_ID);
        setFilterAuthors([]);
        setSelectedFilteredCardIds([]);
        setActiveTheme(ALL_THEMES_ID);
    }, []);

    // Atgriež visus stāvokļus un funkcijas, kas nepieciešamas App komponentē
    return {
        authors, setAuthors,
        themesData, setThemesData,
        cards, setCards,
        articles, setArticles,
        videos, setVideos,
        selectedCard, setSelectedCard,
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
        filteredCardsBase,
        finalFilteredCards,
        paginatedCards,
        paginatedArticles,
        paginatedVideos,
        activeFiltersList,
        handleRemoveFilter,
        handleClearAllActiveFilters,
        ITEMS_PER_PAGE_OPTIONS,
        ALL_THEMES_ID, // Eksportējam arī šo konstanti
    };
};

export default useAppData;
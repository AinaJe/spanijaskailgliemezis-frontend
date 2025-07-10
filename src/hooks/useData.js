// src/hooks/useData.js
import { useState, useEffect, useMemo } from 'react';
import { simulatedAuthors } from '../data/simulatedAuthors';
import { simulatedThemesData } from '../data/simulatedThemesData';
import { simulatedCards } from '../data/simulatedCards';
import { simulatedArticles } from '../data/simulatedArticles';
import { simulatedVideos } from '../data/simulatedVideos';

export const useData = () => {
  const [authors, setAuthors] = useState([]);
  const [themes, setThemes] = useState([]);
  const [rawCards, setRawCards] = useState([]);
  const [rawArticles, setRawArticles] = useState([]);
  const [rawVideos, setRawVideos] = useState([]);

  useEffect(() => {
    setAuthors(simulatedAuthors);
    const initialThemes = [
        { id: 1, name: 'Sākums', summary: 'Laipni lūdzam mūsu mājaslapā! Šeit atradīsiet jaunāko un aktuālāko informāciju.', description: '<p>Esiet sveicināti mūsu digitālajā centrā! Mēs esam priecīgi dalīties ar jums jaunākajām <b>kartītēm</b>, <b>rakstiem</b> un <b>video</b>, kas aptver dažādas aizraujošas tēmas. Izpētiet mūsu saturu un atklājiet jaunas zināšanas!</p>' },
        { id: 'all', name: 'Visas', summary: 'Visas kartītes kopā, neatkarīgi no tēmas.', description: '<p>Šeit ir redzami visi mūsu pieejamie kartīšu ieraksti, neatkarīgi no tēmas.</p>' },
        ...(Array.isArray(simulatedThemesData) ? simulatedThemesData : [])
    ];
    setThemes(initialThemes);
    setRawCards(simulatedCards);
    setRawArticles(simulatedArticles);
    setRawVideos(simulatedVideos);
  }, []);

  const enrichedData = useMemo(() => {
    const safeAuthors = Array.isArray(authors) ? authors : [];
    const safeThemes = Array.isArray(themes) ? themes : [];

    const enrichedCards = (Array.isArray(rawCards) ? rawCards : []).map(card => {
        const author = safeAuthors.find(a => a.id === card.authorId);
        const theme = safeThemes.find(t => t.id === card.theme);
        const imagesWithAuthors = card.images.map(img => ({
            ...img,
            authorName: safeAuthors.find(a => a.id === img.authorId)?.name || 'Nezināms autors'
        }));
        return {
            ...card,
            authorName: author ? author.name : 'Nezināms autors',
            themeName: theme ? theme.name : 'Nezināma tēma',
            images: imagesWithAuthors,
            allAuthors: safeAuthors
        };
    });

    const enrichedArticles = (Array.isArray(rawArticles) ? rawArticles : []).map(article => {
        const author = safeAuthors.find(a => a.id === article.authorId);
        return { ...article, authorName: author ? author.name : 'Nezināms autors' };
    });

    const enrichedVideos = (Array.isArray(rawVideos) ? rawVideos : []).map(video => {
        const author = safeAuthors.find(a => a.id === video.authorId);
        return { ...video, authorName: author ? author.name : 'Nezināms autors' };
    });

    return { 
        enrichedCards, 
        enrichedArticles, 
        enrichedVideos 
    };
  }, [authors, themes, rawCards, rawArticles, rawVideos]);

  return {
    authors,
    setAuthors,
    themesData: themes,
    setThemesData: setThemes,
    cards: enrichedData.enrichedCards,
    setCards: setRawCards,
    articles: enrichedData.enrichedArticles,
    setArticles: setRawArticles,
    videos: enrichedData.enrichedVideos,
    setVideos: setRawVideos,
  };
};
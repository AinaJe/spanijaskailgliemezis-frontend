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
    setThemes(simulatedThemesData);
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
        return {
            ...card,
            authorName: author ? author.name : 'Nezināms autors',
            themeName: theme ? theme.name : 'Nezināma tēma',
            allAuthors: safeAuthors // Pievienojam visus autorus attēlu karuselim
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
    themesData: themes, // Pārsaucam, lai saglabātu konsekvenci
    setThemesData: setThemes,
    cards: enrichedData.enrichedCards,
    setCards: setRawCards, // Setteris strādā ar "jēlajiem" datiem
    articles: enrichedData.enrichedArticles,
    setArticles: setRawArticles,
    videos: enrichedData.enrichedVideos,
    setVideos: setRawVideos,
  };
};
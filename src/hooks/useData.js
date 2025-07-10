// src/hooks/useData.js
import { useState, useEffect } from 'react';
import { simulatedAuthors } from '../data/simulatedAuthors';
import { simulatedThemesData } from '../data/simulatedThemesData';
import { simulatedCards } from '../data/simulatedCards';
import { simulatedArticles } from '../data/simulatedArticles';
import { simulatedVideos } from '../data/simulatedVideos';

export const useData = () => {
  const [authors, setAuthors] = useState([]);
  const [themesData, setThemesData] = useState([]);
  const [cards, setCards] = useState([]);
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Sākotnējā datu ielāde no simulētajiem failiem
    setAuthors(simulatedAuthors);
    const initialThemes = [
        { id: 1, name: 'Sākums', summary: 'Laipni lūdzam mūsu mājaslapā! Šeit atradīsiet jaunāko un aktuālāko informāciju.', description: '<p>Esiet sveicināti mūsu digitālajā centrā! Mēs esam priecīgi dalīties ar jums jaunākajām <b>kartītēm</b>, <b>rakstiem</b> un <b>video</b>, kas aptver dažādas aizraujošas tēmas. Izpētiet mūsu saturu un atklājiet jaunas zināšanas!</p>' },
        { id: 'all', name: 'Visas', summary: 'Visas kartītes kopā, neatkarīgi no tēmas.', description: '<p>Šeit ir redzami visi mūsu pieejamie kartīšu ieraksti, neatkarīgi no tēmas.</p>' },
        ...(Array.isArray(simulatedThemesData) ? simulatedThemesData : [])
    ];
    setThemesData(initialThemes);
    setCards(simulatedCards);
    setArticles(simulatedArticles);
    setVideos(simulatedVideos);
  }, []);

  return {
    authors,
    setAuthors,
    themesData,
    setThemesData,
    cards,
    setCards,
    articles,
    setArticles,
    videos,
    setVideos,
  };
};
// src/hooks/useData.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import * as api from '../api'; // Importējam visas API funkcijas

export const useData = () => {
  const [authors, setAuthors] = useState([]);
  const [themes, setThemes] = useState([]);
  const [rawCards, setRawCards] = useState([]);
  const [rawArticles, setRawArticles] = useState([]);
  const [rawVideos, setRawVideos] = useState([]);

  // Funkcija datu ielādei no API
  const fetchData = useCallback(async () => {
    try {
      const fetchedAuthors = await api.getAuthors();
      setAuthors(fetchedAuthors);

      const fetchedThemes = await api.getThemes();
      // Centrālā tēmu definīcija (Sākums, Visi) un pārējās no API
      const initialThemes = [
          { id: 1, name: 'Sākums', summary: 'Laipni lūdzam mūsu mājaslapā! Šeit atradīsiet jaunāko un aktuālāko informāciju.', description: '<p>Esiet sveicināti mūsu digitālajā centrā! Mēs esam priecīgi dalīties ar jums jaunākajām <b>kartītēm</b>, <b>rakstiem</b> un <b>video</b>, kas aptver dažādas aizraujošas tēmas. Izpētiet mūsu saturu un atklājiet jaunas zināšanas!</p>' },
          { id: 'all', name: 'Visi', summary: 'Visi ieteikumi kopā, neatkarīgi no tēmas.', description: '<p>Šeit ir redzami visi mūsu pieejamie ieteikumi, neatkarīgi no tēmas.</p>' },
          // Filtrējam ārā tēmas, kurām ir id 1 vai 'all', ja tās nāktu no bekenda, lai izvairītos no dublikātiem
          ...(Array.isArray(fetchedThemes) ? fetchedThemes.filter(t => t.id !== 1 && t.id !== 'all') : [])
      ];
      setThemes(initialThemes);

      const fetchedCards = await api.getCards();
      setRawCards(fetchedCards);

      const fetchedArticles = await api.getArticles();
      setRawArticles(fetchedArticles);

      const fetchedVideos = await api.getVideos();
      setRawVideos(fetchedVideos);

    } catch (error) {
      console.error('Kļūda, ielādējot datus no API:', error);
      // Var parādīt lietotājam kļūdas ziņojumu, piemēram, ar alert()
    }
  }, []);

  // Ielādēt datus, kad komponents pirmo reizi tiek ielādēts
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // CRUD operācijas, kas izsauks API funkcijas
  const addEntity = useCallback(async (type, data) => {
    try {
      let newRecord;
      if (type === 'author') newRecord = await api.createAuthor(data);
      else if (type === 'theme') newRecord = await api.createTheme(data);
      else if (type === 'card') newRecord = await api.createCard(data);
      else if (type === 'article') newRecord = await api.createArticle(data);
      else if (type === 'video') newRecord = await api.createVideo(data);

      // Pēc veiksmīgas izveides, pārlādējam datus, lai atsvaidzinātu UI
      await fetchData(); // Sagaidām, kamēr dati tiek ielādēti
      return newRecord;
    } catch (error) {
      console.error(`Kļūda, pievienojot ${type} caur API:`, error);
      throw error; // Pārsviest kļūdu uz komponentu
    }
  }, [fetchData]);

  const updateEntity = useCallback(async (type, id, data) => {
    try {
      let updatedRecord;
      if (type === 'author') updatedRecord = await api.updateAuthor(id, data);
      else if (type === 'theme') updatedRecord = await api.updateTheme(id, data);
      else if (type === 'card') updatedRecord = await api.updateCard(id, data);
      else if (type === 'article') updatedRecord = await api.updateArticle(id, data);
      else if (type === 'video') updatedRecord = await api.updateVideo(id, data);

      await fetchData();
      return updatedRecord;
    } catch (error) {
      console.error(`Kļūda, atjauninot ${type} caur API:`, error);
      throw error;
    }
  }, [fetchData]);

  const deleteEntity = useCallback(async (type, id) => {
    try {
      if (type === 'author') await api.deleteAuthor(id);
      else if (type === 'theme') await api.deleteTheme(id);
      else if (type === 'card') await api.deleteCard(id);
      else if (type === 'article') await api.deleteArticle(id);
      else if (type === 'video') await api.deleteVideo(id);

      await fetchData();
    } catch (error) {
      console.error(`Kļūda, dzēšot ${type} caur API:`, error);
      throw error;
    }
  }, [fetchData]);

  // Datu bagātināšana ar autora vārdiem, tēmu nosaukumiem utt. (klienta pusē)
  const enrichedData = useMemo(() => {
    const safeAuthors = Array.isArray(authors) ? authors : [];
    const safeThemes = Array.isArray(themes) ? themes : [];

    const enrichedCards = (Array.isArray(rawCards) ? rawCards : []).map(card => {
        const author = safeAuthors.find(a => a.id === card.author_id);
        const theme = safeThemes.find(t => t.id === card.theme_id);
        
        const imagesWithAuthors = card.images ? card.images.map(img => {
            const imgAuthor = safeAuthors.find(a => a.id === img.author_id);
            return {
                ...img,
                authorName: imgAuthor ? imgAuthor.name : 'Nezināms autors'
            };
        }) : [];

        return {
            ...card,
            // Pārsaucam laukus, lai tie atbilstu frontenda sagaidītajam formātam
            authorId: card.author_id,
            theme: card.theme_id,
            authorName: author ? author.name : 'Nezināms autors',
            themeName: theme ? theme.name : 'Nezināma tēma',
            images: imagesWithAuthors,
            allAuthors: safeAuthors
        };
    });

    const enrichedArticles = (Array.isArray(rawArticles) ? rawArticles : []).map(article => {
        const author = safeAuthors.find(a => a.id === article.author_id);
        return {
            ...article,
            authorId: article.author_id,
            authorName: author ? author.name : 'Nezināms autors'
        };
    });

    const enrichedVideos = (Array.isArray(rawVideos) ? rawVideos : []).map(video => {
        const author = safeAuthors.find(a => a.id === video.author_id);
        return {
            ...video,
            authorId: video.author_id,
            authorName: author ? author.name : 'Nezināms autors'
        };
    });

    return {
        enrichedCards,
        enrichedArticles,
        enrichedVideos
    };
  }, [authors, themes, rawCards, rawArticles, rawVideos]);

  return {
    authors,
    themesData: themes,
    cards: enrichedData.enrichedCards,
    articles: enrichedData.enrichedArticles,
    videos: enrichedData.enrichedVideos,
    addEntity,
    updateEntity,
    deleteEntity,
  };
};
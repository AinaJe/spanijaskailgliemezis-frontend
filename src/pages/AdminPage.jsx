// src/pages/AdminPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import './AdminPage.css';
import Accordion from '../components/common/Accordion/Accordion';
import Pagination from '../components/common/Pagination/Pagination';
import Modal from '../components/common/Modals/Modal';
import CardForm from '../components/forms/CardForm/CardForm';
import AddAuthorForm from '../components/forms/AddAuthorForm';
import AddThemeForm from '../components/forms/AddThemeForm';
import AddArticleForm from '../components/forms/AddArticleForm';
import AddVideoForm from '../components/forms/AddVideoForm';
import AdminSection from '../components/common/AdminSection'; // Jaunais imports

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt, faEye, faGripVertical } from '@fortawesome/free-solid-svg-icons';

import { formatDateTimeToDDMMYYYYHHMM, formatDateToDDMMYYYY } from '../utils/dateUtils';

import config from '/src/config';

import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100, Infinity];

const SortableCardRow = ({ card, themes, authors, handleView, handleEdit, handleDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: card.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <tr ref={setNodeRef} style={style} {...attributes}>
            <td className="drag-handle" {...listeners}>
                <FontAwesomeIcon icon={faGripVertical} />
            </td>
            <td data-label="ID">{card.id}</td>
            <td data-label="Nosaukums">{card.title}</td>
            <td data-label="Tēma">{themes.find(t => t.id === card.theme)?.name || 'N/A'}</td>
            <td data-label="Autors">{authors.find(a => a.id === card.authorId)?.name || 'N/A'}</td>
            <td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(card.created_at)}</td>
            <td data-label="Darbības" className="admin-table-actions">
                <button onClick={() => handleView('kartīti', card.id)} className="admin-table-button view-button">
                    <FontAwesomeIcon icon={faEye} />
                </button>
                <button onClick={() => handleEdit('kartīti', card.id)} className="admin-table-button edit-button">
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete('kartīti', card.id)} className="admin-table-button delete-button">
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    );
};


const AdminPage = ({ authors, themes, articles, videos, cards, setAuthors, setThemesData, setCards, setArticles, setVideos }) => {
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [openCardThemeAccordionId, setOpenCardThemeAccordionId] = useState(null);

  const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = useState(false);
  const [isAddThemeModalOpen, setIsAddThemeModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isAddArticleModalOpen, setIsAddArticleModalOpen] = useState(false);
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);

  const [authorsCurrentPage, setAuthorsCurrentPage] = useState(1);
  const [authorsItemsPerPage, setAuthorsItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  const [themesCurrentPage, setThemesCurrentPage] = useState(1);
  const [themesItemsPerPage, setThemesItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  const [articlesCurrentPage, setArticlesCurrentPage] = useState(1);
  const [articlesItemsPerPage, setArticlesItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  const [videosCurrentPage, setVideosCurrentPage] = useState(1);
  const [videosItemsPerPage, setVideosItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  const [cardsCurrentPage, setCardsCurrentPage] = useState(1);
  const [cardsItemsPerPage, setCardsItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  
  const [sortedCards, setSortedCards] = useState(cards);

  useEffect(() => {
      setSortedCards(cards);
  }, [cards]);

  const handleDragEnd = (event) => {
    const {active, over} = event;
    if (active.id !== over.id) {
      setSortedCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        return newOrder;
      });
    }
  };

  const paginatedAuthors = Array.isArray(authors) ? authors.slice(
    (authorsCurrentPage - 1) * authorsItemsPerPage,
    (authorsCurrentPage - 1) * authorsItemsPerPage + authorsItemsPerPage
  ) : [];

  const actualThemes = Array.isArray(themes) ? themes.filter(t => t.id !== 1 && t.id !== 2) : [];
  const paginatedThemes = [...actualThemes].sort((a, b) => a.name.localeCompare(b.name)).slice(
    (themesCurrentPage - 1) * themesItemsPerPage,
    (themesCurrentPage - 1) * themesItemsPerPage + themesItemsPerPage
  );

  const paginatedArticles = Array.isArray(articles) ? [...articles].sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  }).slice(
    (articlesCurrentPage - 1) * articlesItemsPerPage,
    (articlesCurrentPage - 1) * articlesItemsPerPage + articlesItemsPerPage
  ) : [];

  const paginatedVideos = Array.isArray(videos) ? [...videos].sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  }).slice(
    (videosCurrentPage - 1) * videosItemsPerPage,
    (videosCurrentPage - 1) * videosItemsPerPage + videosItemsPerPage
  ) : [];

  const groupedCardsByTheme = useMemo(() => {
    return sortedCards.reduce((acc, card) => {
      const themeId = card.theme;
      if (!acc[themeId]) {
        acc[themeId] = [];
      }
      acc[themeId].push(card);
      return acc;
    }, {});
  }, [sortedCards]);

  const handleToggleAccordion = (id) => {
    setOpenAccordionId(prevId => (prevId === id ? null : id));
  };
  
  const handleToggleCardThemeAccordion = (id) => {
    setOpenCardThemeAccordionId(prevId => (prevId === id ? null : id));
  };

  const handleView = (type, id) => {
    alert(`Skatīt: ${type} ar ID ${id}`);
  };

  const handleEdit = (type, id) => {
    alert(`Rediģēt: ${type} ar ID ${id}`);
  };

  const handleDelete = (type, id) => {
    if (window.confirm(`Vai tiešām vēlaties dzēst ${type} ar ID ${id}?`)) {
      switch (type) {
        case 'autoru':
          setAuthors(prev => prev.filter(item => item.id !== id));
          break;
        case 'tēmu':
          setThemesData(prev => prev.filter(item => item.id !== id));
          break;
        case 'rakstu':
          setArticles(prev => prev.filter(item => item.id !== id));
          break;
        case 'video':
          setVideos(prev => prev.filter(item => item.id !== id));
          break;
        case 'kartīti':
          setCards(prev => prev.filter(item => item.id !== id));
          break;
        default:
          break;
      }
      alert(`Dzēst: ${type} ar ID ${id} (simulācija)`);
    }
  };

 const addAuthor = async (newAuthorData) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/authors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAuthorData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.messages?.error || responseData.error?.name || 'Neizdevās pievienot autoru.';
        alert(`Kļūda: ${errorMessage}`);
        console.error('API kļūda pievienojot autoru:', responseData);
        return;
      }

      setAuthors(prev => [...prev, responseData.data]);
      setIsAddAuthorModalOpen(false);
      alert("Autors veiksmīgi pievienots!");
    } catch (error) {
      console.error('Kļūda pievienojot autoru:', error);
      alert('Neizdevās pievienot autoru: Servera vai tīkla kļūda.');
    }
  };

  const addTheme = async (newThemeData) => {
    console.log("Adding theme:", newThemeData);
    const mainNavThemeIds = {
        "Sākums": 1,
        "Visas": 2,
        "Biedrība": 104,
        "Tirdzniecība": 105,
        "Stāsti": 106,
        "Izdrukām": 107
    };
    let newId;
    if (mainNavThemeIds[newThemeData.name]) {
        newId = mainNavThemeIds[newThemeData.name];
    } else {
        newId = Date.now();
    }

    setThemesData(prev => [...prev, { ...newThemeData, id: newId, created_at: new Date().toISOString() }]);
    setIsAddThemeModalOpen(false);
    alert("Tēma pievienota (simulācija)!");
  };

  const addCard = async (newCardData) => {
    console.log('Adding card:', newCardData);
    const response = await new Promise(resolve => setTimeout(() => {
        const savedCard = { ...newCardData, id: Date.now() };
        let finalAuthorId = newCardData.authorId;
        if (newCardData.authorId && String(newCardData.authorId).startsWith('new-author-')) {
            const newAuthorName = String(newCardData.authorId).replace('new-author-', '');
            const existingAuthor = authors.find(a => a.name === newAuthorName);
            if (existingAuthor) {
                finalAuthorId = existingAuthor.id;
            } else {
                const newAuthorTempId = Date.now();
                setAuthors(prevAuthors => [...prevAuthors, { id: newAuthorTempId, name: newAuthorName, created_at: new Date().toISOString() }]);
                finalAuthorId = newAuthorTempId;
            }
        }

        let finalThemeId = newCardData.theme;
        if (newCardData.isNewTheme && newCardData.newThemeName) {
            const newThemeName = newCardData.newThemeName;
            const existingTheme = themes.find(t => t.name === newThemeName);
            if (existingTheme) {
                finalThemeId = existingTheme.id;
            } else {
                const newThemeTempId = Date.now();
                setThemesData(prevThemes => [...prevThemes, { id: newThemeTempId, name: newThemeName, summary: newCardData.newThemeSummary, description: newCardData.newThemeDescription, created_at: new Date().toISOString() }]);
                finalThemeId = newThemeTempId;
            }
        } else if (newCardData.theme) {
            const existingTheme = themes.find(t => t.name === newCardData.theme);
            if (existingTheme) {
                finalThemeId = existingTheme.id;
            } else {
                console.warn("Kartītes tēma netika atrasta (esošās tēmas gadījumā)!");
                finalThemeId = null;
            }
        }

        const imagesWithFinalAuthorIds = newCardData.images.map(img => {
            if (img.authorId && typeof img.authorId === 'string' && String(img.authorId).startsWith('new-author-')) {
                const newImageAuthorName = img.newImageAuthorNameInput ? img.newImageAuthorNameInput.trim() : '';
                const existingImageAuthor = authors.find(a => a.name === newImageAuthorName);
                if (existingImageAuthor) {
                    return { ...img, authorId: existingImageAuthor.id };
                } else {
                    const newImageAuthorTempId = Date.now();
                    setAuthors(prevAuthors => [...prevAuthors, { id: newImageAuthorTempId, name: newImageAuthorName, created_at: new Date().toISOString() }]);
                    return { ...img, authorId: newImageAuthorTempId };
                }
            }
            return img;
        });

        resolve({
          ...savedCard,
          theme: finalThemeId,
          authorId: finalAuthorId,
          description: newCardData.description,
          images: imagesWithFinalAuthorIds,
          created_at: new Date().toISOString(),
        });
    }, 500));

    setCards((prevCards) => {
      const cardAuthor = authors.find(a => a.id === response.authorId);
      const cardThemeData = themes.find(t => t.id === response.theme);
      const cardWithDetails = {
        ...response,
        authorName: cardAuthor ? cardAuthor.name : 'Nezināms autors',
        themeName: cardThemeData ? cardThemeData.name : 'Nezināma tēma',
        themeSummary: cardThemeData ? cardThemeData.summary : 'Nav kopsavilkuma',
        images: response.images.map(img => {
          const imgAuthor = authors.find(a => a.id === img.authorId);
          return {
            ...img,
            authorName: imgAuthor ? imgAuthor.name : 'Nezināms autors'
          };
        })
      };
      return [...prevCards, cardWithDetails];
    });
    setIsAddCardModalOpen(false);
    alert('Kartīte pievienota (simulācija)!');
  };

  const addArticle = async (newArticleData) => {
    console.log("Adding article:", newArticleData);
    let finalAuthorId = newArticleData.authorId;
    if (newArticleData.authorId && String(newArticleData.authorId).startsWith('new-author-')) {
        const newAuthorName = String(newArticleData.authorId).replace('new-author-', '');
        const existingAuthor = authors.find(a => a.name === newAuthorName);
        if (existingAuthor) {
            finalAuthorId = existingAuthor.id;
        } else {
            const newAuthorTempId = Date.now();
            setAuthors(prevAuthors => [...prevAuthors, { id: newAuthorTempId, name: newAuthorName, created_at: new Date().toISOString() }]);
            finalAuthorId = newAuthorTempId;
        }
    }
    const newId = Date.now();
    setArticles(prev => [...prev, { ...newArticleData, id: newId, authorId: finalAuthorId, created_at: new Date().toISOString() }]);
    setIsAddArticleModalOpen(false);
    alert("Raksts pievienots (simulācija)!");
  };

  const addVideo = async (newVideoData) => {
    console.log("Adding video:", newVideoData);
    let finalAuthorId = newVideoData.authorId;
    if (newVideoData.authorId && String(newVideoData.authorId).startsWith('new-author-')) {
        const newAuthorName = String(newVideoData.authorId).replace('new-author-', '');
        const existingAuthor = authors.find(a => a.name === newAuthorName);
        if (existingAuthor) {
            finalAuthorId = existingAuthor.id;
        } else {
            const newAuthorTempId = Date.now();
            setAuthors(prevAuthors => [...prevAuthors, { id: newAuthorTempId, name: newAuthorName, created_at: new Date().toISOString() }]);
            finalAuthorId = newAuthorTempId;
        }
    }
    const newId = Date.now();
    setVideos(prev => [...prev, { ...newVideoData, id: newId, authorId: finalAuthorId, created_at: new Date().toISOString() }]);
    setIsAddVideoModalOpen(false);
    alert("Video pievienots (simulācija)!");
  };
  
  const authorColumns = [
    { label: 'ID', width: '60px' },
    { label: 'Vārds', width: 'auto' },
    { label: 'Izveidots', width: '180px' },
    { label: 'Darbības', width: '120px' },
  ];

  const themeColumns = [
    { label: 'ID', width: '60px' },
    { label: 'Nosaukums', width: '150px' },
    { label: 'Kopsavilkums', width: 'auto' },
    { label: 'Izveidots', width: '180px' },
    { label: 'Darbības', width: '120px' },
  ];
  
  const articleColumns = [
    { label: 'ID', width: '60px' },
    { label: 'Datums', width: '120px' },
    { label: 'Nosaukums', width: 'auto' },
    { label: 'Autors', width: '195px' },
    { label: 'Izveidots', width: '180px' },
    { label: 'Darbības', width: '120px' },
  ];

  return (
    <div className="admin-page-container">
      <h2 className="admin-page-title">Ierakstu pārvaldība</h2>

      <div className="admin-action-buttons">
        <button className="admin-action-button" onClick={() => setIsAddAuthorModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Pievienot autoru</button>
        <button className="admin-action-button" onClick={() => setIsAddThemeModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Pievienot tēmu</button>
        <button className="admin-action-button" onClick={() => setIsAddCardModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Pievienot kartīti</button>
        <button className="admin-action-button" onClick={() => setIsAddArticleModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Pievienot rakstu</button>
        <button className="admin-action-button" onClick={() => setIsAddVideoModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Pievienot video</button>
      </div>

      <Modal isOpen={isAddAuthorModalOpen} onClose={() => setIsAddAuthorModalOpen(false)} title="Pievienot autoru">
        <AddAuthorForm onAddAuthor={addAuthor} onClose={() => setIsAddAuthorModalOpen(false)} availableAuthors={authors} />
      </Modal>

      <Modal isOpen={isAddThemeModalOpen} onClose={() => setIsAddThemeModalOpen(false)} title="Pievienot tēmu">
        <AddThemeForm onAddTheme={addTheme} onClose={() => setIsAddThemeModalOpen(false)} />
      </Modal>

      <Modal isOpen={isAddCardModalOpen} onClose={() => setIsAddCardModalOpen(false)} title="Pievienot kartīti">
        <CardForm
          onAddCard={addCard}
          availableThemes={themes.filter(t => ![1, 2, 104, 105, 106, 107].includes(t.id)).map(t => t.name)}
          availableAuthors={authors}
          allowHomepageTheme={true}
        />
      </Modal>

      <Modal isOpen={isAddArticleModalOpen} onClose={() => setIsAddArticleModalOpen(false)} title="Pievienot rakstu">
        <AddArticleForm onAddArticle={addArticle} onClose={() => setIsAddArticleModalOpen(false)} availableAuthors={authors} />
      </Modal>

      <Modal isOpen={isAddVideoModalOpen} onClose={() => setIsAddVideoModalOpen(false)} title="Pievienot video">
        <AddVideoForm onAddVideo={addVideo} onClose={() => setIsAddVideoModalOpen(false)} availableAuthors={authors} />
      </Modal>

      <div className="admin-content-sections">
        <AdminSection
            title="Autori"
            isOpen={openAccordionId === 'authors'}
            onToggle={() => handleToggleAccordion('authors')}
            data={paginatedAuthors}
            columns={authorColumns}
            renderRow={(author) => (
                <tr key={author.id}>
                    <td data-label="ID">{author.id}</td>
                    <td data-label="Vārds">{author.name}</td>
                    <td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(author.created_at)}</td>
                    <td data-label="Darbības" className="admin-table-actions">
                        <button onClick={() => handleView('autoru', author.id)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => handleEdit('autoru', author.id)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => handleDelete('autoru', author.id)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                </tr>
            )}
            paginationProps={{
                totalItems: authors.length,
                itemsPerPage: authorsItemsPerPage,
                currentPage: authorsCurrentPage,
                onPageChange: setAuthorsCurrentPage,
                onItemsPerPageChange: setAuthorsItemsPerPage,
            }}
            itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
        />

        <AdminSection
            title="Tēmas"
            isOpen={openAccordionId === 'themes'}
            onToggle={() => handleToggleAccordion('themes')}
            data={paginatedThemes}
            columns={themeColumns}
            renderRow={(theme) => (
                <tr key={theme.id}>
                    <td data-label="ID">{theme.id}</td>
                    <td data--label="Nosaukums">{theme.name}</td>
                    <td data-label="Kopsavilkums">{theme.summary || 'Nav kopsavilkuma'}</td>
                    <td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(theme.created_at)}</td>
                    <td data-label="Darbības" className="admin-table-actions">
                        <button onClick={() => handleView('tēmu', theme.id)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => handleEdit('tēmu', theme.id)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => handleDelete('tēmu', theme.id)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                </tr>
            )}
            paginationProps={{
                totalItems: actualThemes.length,
                itemsPerPage: themesItemsPerPage,
                currentPage: themesCurrentPage,
                onPageChange: setThemesCurrentPage,
                onItemsPerPageChange: setThemesItemsPerPage,
            }}
            itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
        />
        
        <AdminSection
            title="Raksti"
            isOpen={openAccordionId === 'articles'}
            onToggle={() => handleToggleAccordion('articles')}
            data={paginatedArticles}
            columns={articleColumns}
            renderRow={(article) => (
                 <tr key={article.id}>
                    <td data-label="ID">{article.id}</td>
                    <td data-label="Datums">{formatDateToDDMMYYYY(article.date)}</td>
                    <td data-label="Nosaukums">{article.title}</td>
                    <td data-label="Autors">{authors.find(a => a.id === article.authorId)?.name || 'N/A'}</td>
                    <td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(article.created_at)}</td>
                    <td data-label="Darbības" className="admin-table-actions">
                        <button onClick={() => handleView('rakstu', article.id)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => handleEdit('rakstu', article.id)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => handleDelete('rakstu', article.id)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                </tr>
            )}
            paginationProps={{
                totalItems: articles.length,
                itemsPerPage: articlesItemsPerPage,
                currentPage: articlesCurrentPage,
                onPageChange: setArticlesCurrentPage,
                onItemsPerPageChange: setArticlesItemsPerPage,
            }}
            itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
        />

        <AdminSection
            title="Video"
            isOpen={openAccordionId === 'videos'}
            onToggle={() => handleToggleAccordion('videos')}
            data={paginatedVideos}
            columns={articleColumns}
            renderRow={(video) => (
                <tr key={video.id}>
                    <td data-label="ID">{video.id}</td>
                    <td data-label="Datums">{formatDateToDDMMYYYY(video.date)}</td>
                    <td data-label="Nosaukums">{video.title}</td>
                    <td data-label="Autors">{authors.find(a => a.id === video.authorId)?.name || 'N/A'}</td>
                    <td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(video.created_at)}</td>
                    <td data-label="Darbības" className="admin-table-actions">
                        <button onClick={() => handleView('video', video.id)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => handleEdit('video', video.id)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => handleDelete('video', video.id)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                </tr>
            )}
            paginationProps={{
                totalItems: videos.length,
                itemsPerPage: videosItemsPerPage,
                currentPage: videosCurrentPage,
                onPageChange: setVideosCurrentPage,
                onItemsPerPageChange: setVideosItemsPerPage,
            }}
            itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
        />

        <Accordion
          title="Kartītes"
          isOpen={openAccordionId === 'cards'}
          onToggle={() => handleToggleAccordion('cards')}
          content={
            <>
              {Object.keys(groupedCardsByTheme).length === 0 ? (
                <p>Nav nevienas kartītes.</p>
              ) : (
                Object.keys(groupedCardsByTheme).map(themeId => {
                  const themeCards = groupedCardsByTheme[themeId];
                  const theme = themes.find(t => t.id === parseInt(themeId, 10));
                  return (
                    <Accordion
                      key={themeId}
                      title={`${theme ? theme.name : 'Nezināma tēma'} (${themeCards.length})`}
                      isOpen={openCardThemeAccordionId === themeId}
                      onToggle={() => handleToggleCardThemeAccordion(themeId)}
                      content={
                        <DndContext
                          collisionDetection={closestCenter}
                          onDragEnd={handleDragEnd}
                        >
                          <div className="admin-table-wrapper">
                            <table className="admin-data-table">
                                <colgroup>
                                  <col style={{ width: '40px' }} />
                                  <col style={{ width: '60px' }} />
                                  <col style={{ width: 'auto' }} />
                                  <col style={{ width: '150px' }} />
                                  <col style={{ width: '195px' }} />
                                  <col style={{ width: '180px' }} />
                                  <col style={{ width: '120px' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th />
                                    <th data-label="ID">ID</th>
                                    <th data-label="Nosaukums">Nosaukums</th>
                                    <th data-label="Tēma">Tēma</th>
                                    <th data-label="Autors">Autors</th>
                                    <th data-label="Izveidots">Izveidots</th>
                                    <th data-label="Darbības">Darbības</th>
                                  </tr>
                                </thead>
                                <SortableContext
                                    items={themeCards.map(c => c.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <tbody>
                                      {themeCards.map((card) => (
                                        <SortableCardRow 
                                            key={card.id} 
                                            card={card} 
                                            themes={themes} 
                                            authors={authors}
                                            handleView={handleView}
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                        />
                                      ))}
                                    </tbody>
                                </SortableContext>
                            </table>
                          </div>
                        </DndContext>
                      }
                    />
                  )
                })
              )}
              <Pagination
                totalItems={Array.isArray(cards) ? cards.length : 0}
                itemsPerPage={cardsItemsPerPage}
                currentPage={cardsCurrentPage}
                onPageChange={setCardsCurrentPage}
                onItemsPerPageChange={setCardsItemsPerPage}
                itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
              />
            </>
          }
        />
      </div>
    </div>
  );
};

export default AdminPage;
// src/pages/AdminPage.jsx
import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import './AdminPage.css';
import Accordion from '../components/common/Accordion/Accordion';
import AdminSection from '../components/common/AdminSection';
import AdminActionButtons from '../components/common/AdminActionButtons';
import AdminModals from '../components/common/AdminModals';
import Modal from '../components/common/Modals/Modal';
import EditAuthorForm from '../components/forms/EditAuthorForm';
import EditThemeForm from '../components/forms/EditThemeForm';
import InfoModal from '../components/common/Modals/InfoModal';
import ConfirmDeleteModal from '../components/common/Modals/ConfirmDeleteModal';
const CardDetailModal = lazy(() => import('../components/common/Modals/CardDetailModal/CardDetailModal'));

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { formatDateTimeToDDMMYYYYHHMM, formatDateToDDMMYYYY } from '../utils/dateUtils';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100, Infinity];

const SortableCardRow = ({ card, authors, handleView, handleEdit, handleDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <tr ref={setNodeRef} style={style} {...attributes}>
            <td className="drag-handle" {...listeners}><FontAwesomeIcon icon={faGripVertical} /></td>
            <td data-label="ID">{card.id}</td>
            <td data-label="Nosaukums">{card.title}</td>
            <td data-label="Autors">{card.authorName}</td>
            <td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(card.created_at)}</td>
            <td data-label="Darbības" className="admin-table-actions">
                <button onClick={() => handleView('kartīti', card.id)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                <button onClick={() => handleEdit('kartīti', card.id)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                <button onClick={() => handleDelete('kartīti', card.id)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
            </td>
        </tr>
    );
};


const AdminPage = ({ authors, themes, articles, videos, cards, setAuthors, setThemesData, setCards, setArticles, setVideos }) => {
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [openCardThemeAccordionId, setOpenCardThemeAccordionId] = useState(null);

  const [modalsState, setModalsState] = useState({ author: false, theme: false, card: false, article: false, video: false });
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [authorsCurrentPage, setAuthorsCurrentPage] = useState(1);
  const [authorsItemsPerPage, setAuthorsItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  const [themesCurrentPage, setThemesCurrentPage] = useState(1);
  const [themesItemsPerPage, setThemesItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  const [articlesCurrentPage, setArticlesCurrentPage] = useState(1);
  const [articlesItemsPerPage, setArticlesItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  const [videosCurrentPage, setVideosCurrentPage] = useState(1);
  const [videosItemsPerPage, setVideosItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  
  const [sortedCards, setSortedCards] = useState(cards);

  useEffect(() => { setSortedCards(cards); }, [cards]);

  const handleDragEnd = (event) => {
    const {active, over} = event;
    if (active.id !== over.id) {
      setSortedCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const paginatedAuthors = Array.isArray(authors) ? authors.slice((authorsCurrentPage - 1) * authorsItemsPerPage, (authorsCurrentPage - 1) * authorsItemsPerPage + authorsItemsPerPage) : [];
  const actualThemes = Array.isArray(themes) ? themes.filter(t => t.id !== 1 && t.id !== 2) : [];
  const paginatedThemes = [...actualThemes].sort((a, b) => a.name.localeCompare(b.name)).slice((themesCurrentPage - 1) * themesItemsPerPage, (themesCurrentPage - 1) * themesItemsPerPage + themesItemsPerPage);
  const paginatedArticles = Array.isArray(articles) ? [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice((articlesCurrentPage - 1) * articlesItemsPerPage, (articlesCurrentPage - 1) * articlesItemsPerPage + articlesItemsPerPage) : [];
  const paginatedVideos = Array.isArray(videos) ? [...videos].sort((a, b) => new Date(b.date) - new Date(a.date)).slice((videosCurrentPage - 1) * videosItemsPerPage, (videosCurrentPage - 1) * videosItemsPerPage + videosItemsPerPage) : [];

  const groupedCardsByTheme = useMemo(() => {
    return sortedCards.reduce((acc, card) => {
      const themeId = card.theme;
      if (!acc[themeId]) acc[themeId] = [];
      acc[themeId].push(card);
      return acc;
    }, {});
  }, [sortedCards]);

  const handleToggleAccordion = (id) => setOpenAccordionId(prevId => (prevId === id ? null : id));
  const handleToggleCardThemeAccordion = (id) => setOpenCardThemeAccordionId(prevId => (prevId === id ? null : id));
  
  const handleShowModal = (modal) => setModalsState(prev => ({...prev, [modal]: true}));
  const handleCloseModal = (modal) => setModalsState(prev => ({...prev, [modal]: false}));

  const findItem = (type, id) => {
    const dataMap = { 'kartīti': cards, 'rakstu': articles, 'video': videos, 'autoru': authors, 'tēmu': themes };
    return dataMap[type]?.find(item => item.id === id);
  };

  const handleView = (type, id) => {
    const item = findItem(type, id);
    if (item) {
      setSelectedItem(item);
      setSelectedItemType(type);
      setIsViewModalOpen(true);
    }
  };

  const handleEdit = (type, id) => {
    const item = findItem(type, id);
    if (item) {
        setSelectedItem(item);
        setSelectedItemType(type);
        setIsEditModalOpen(true);
    }
  };

  const handleDelete = (type, id) => {
    const item = findItem(type, id);
    if (item) {
      setSelectedItem(item);
      setSelectedItemType(type);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = (type, id) => {
    const settersMap = { 'kartīti': setCards, 'rakstu': setArticles, 'video': setVideos, 'autoru': setAuthors, 'tēmu': setThemesData };
    if (settersMap[type]) {
      settersMap[type](prev => prev.filter(item => item.id !== id));
      alert(`Dzēsts: ${type} ar ID ${id}`);
    }
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };
  
  const handleUpdateAuthor = (id, updatedData) => {
      setAuthors(prev => prev.map(author => author.id === id ? { ...author, ...updatedData } : author));
      setIsEditModalOpen(false);
      setSelectedItem(null);
  };

  const handleUpdateTheme = (id, updatedData) => {
      setThemesData(prev => prev.map(theme => theme.id === id ? { ...theme, ...updatedData } : theme));
      setIsEditModalOpen(false);
      setSelectedItem(null);
  };

  const addAuthor = (newAuthorData) => { setAuthors(prev => [...prev, {id: Date.now(), created_at: new Date().toISOString(), ...newAuthorData}]); handleCloseModal('author'); };
  const addTheme = (newThemeData) => { setThemesData(prev => [...prev, {id: Date.now(), created_at: new Date().toISOString(), ...newThemeData}]); handleCloseModal('theme'); };
  const addCard = (newCardData) => { setCards(prev => [...prev, {id: Date.now(), created_at: new Date().toISOString(), ...newCardData}]); handleCloseModal('card'); };
  const addArticle = (newArticleData) => { setArticles(prev => [...prev, {id: Date.now(), created_at: new Date().toISOString(), ...newArticleData}]); handleCloseModal('article'); };
  const addVideo = (newVideoData) => { setVideos(prev => [...prev, {id: Date.now(), created_at: new Date().toISOString(), ...newVideoData}]); handleCloseModal('video'); };
  
  const authorColumns = [ { label: 'ID', width: '60px' }, { label: 'Vārds', width: 'auto' }, { label: 'Izveidots', width: '180px' }, { label: 'Darbības', width: '120px' }];
  const themeColumns = [ { label: 'ID', width: '60px' }, { label: 'Nosaukums', width: '150px' }, { label: 'Kopsavilkums', width: 'auto' }, { label: 'Izveidots', width: '180px' }, { label: 'Darbības', width: '120px' }];
  const articleColumns = [ { label: 'ID', width: '60px' }, { label: 'Datums', width: '120px' }, { label: 'Nosaukums', width: 'auto' }, { label: 'Autors', width: '195px' }, { label: 'Izveidots', width: '180px' }, { label: 'Darbības', width: '120px' }];
  
  return (
    <div className="admin-page-container">
      <h2 className="admin-page-title">Ierakstu pārvaldība</h2>
      
      <AdminActionButtons onShow={handleShowModal} />

      <AdminModals 
        modalsState={modalsState}
        handlers={{ add: { onAddAuthor: addAuthor, onAddTheme: addTheme, onAddCard: addCard, onAddArticle: addArticle, onAddVideo: addVideo }, onClose: handleCloseModal }}
        data={{ themes, authors }}
      />
      
      {isViewModalOpen && (
        selectedItemType === 'kartīti' ? (
          <Suspense fallback={<div>Ielādē...</div>}>
            <CardDetailModal card={selectedItem} onClose={() => setIsViewModalOpen(false)} />
          </Suspense>
        ) : (
          <InfoModal item={selectedItem} type={selectedItemType} onClose={() => setIsViewModalOpen(false)} />
        )
      )}

      {isDeleteModalOpen && (
        <ConfirmDeleteModal 
            item={selectedItem}
            itemType={selectedItemType}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
        />
      )}
      
      {isEditModalOpen && selectedItem && (
          <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Rediģēt: ${selectedItem.name || selectedItem.title}`}>
              {selectedItemType === 'autoru' && <EditAuthorForm author={selectedItem} onUpdateAuthor={handleUpdateAuthor} onClose={() => setIsEditModalOpen(false)} />}
              {selectedItemType === 'tēmu' && <EditThemeForm theme={selectedItem} onUpdateTheme={handleUpdateTheme} onClose={() => setIsEditModalOpen(false)} />}
              {/* Paziņojums, ja forma vēl nav izveidota */}
              {['rakstu', 'video', 'kartīti'].includes(selectedItemType) && <p>Šī ieraksta rediģēšanas forma vēl nav ieviesta.</p>}
          </Modal>
      )}
      
      <div className="admin-content-sections">
        <AdminSection
            title="Autori" isOpen={openAccordionId === 'authors'} onToggle={() => handleToggleAccordion('authors')} data={paginatedAuthors} columns={authorColumns}
            renderRow={(author) => (
                <tr key={author.id}>
                    <td data-label="ID">{author.id}</td><td data-label="Vārds">{author.name}</td><td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(author.created_at)}</td><td data-label="Darbības" className="admin-table-actions">
                        <button onClick={() => handleView('autoru', author.id)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => handleEdit('autoru', author.id)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => handleDelete('autoru', author.id)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                </tr>
            )}
            paginationProps={{ totalItems: authors.length, itemsPerPage: authorsItemsPerPage, currentPage: authorsCurrentPage, onPageChange: setAuthorsCurrentPage, onItemsPerPageChange: setAuthorsItemsPerPage }}
            itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
        />

        <AdminSection
            title="Tēmas" isOpen={openAccordionId === 'themes'} onToggle={() => handleToggleAccordion('themes')} data={paginatedThemes} columns={themeColumns}
            renderRow={(theme) => (
                <tr key={theme.id}>
                    <td data-label="ID">{theme.id}</td><td data-label="Nosaukums">{theme.name}</td><td data-label="Kopsavilkums">{theme.summary || 'Nav kopsavilkuma'}</td><td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(theme.created_at)}</td><td data-label="Darbības" className="admin-table-actions">
                         <button onClick={() => handleView('tēmu', theme.id)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                         <button onClick={() => handleEdit('tēmu', theme.id)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                         <button onClick={() => handleDelete('tēmu', theme.id)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                </tr>
            )}
            paginationProps={{ totalItems: actualThemes.length, itemsPerPage: themesItemsPerPage, currentPage: themesCurrentPage, onPageChange: setThemesCurrentPage, onItemsPerPageChange: setThemesItemsPerPage }}
            itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
        />
        
        <AdminSection
            title="Raksti" isOpen={openAccordionId === 'articles'} onToggle={() => handleToggleAccordion('articles')} data={paginatedArticles} columns={articleColumns}
            renderRow={(article) => (
                 <tr key={article.id}>
                    <td data-label="ID">{article.id}</td><td data-label="Datums">{formatDateToDDMMYYYY(article.date)}</td><td data-label="Nosaukums">{article.title}</td><td data-label="Autors">{article.authorName}</td><td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(article.created_at)}</td><td data-label="Darbības" className="admin-table-actions">
                        <button onClick={() => handleView('rakstu', article.id)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => handleEdit('rakstu', article.id)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => handleDelete('rakstu', article.id)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                </tr>
            )}
            paginationProps={{ totalItems: articles.length, itemsPerPage: articlesItemsPerPage, currentPage: articlesCurrentPage, onPageChange: setArticlesCurrentPage, onItemsPerPageChange: setArticlesItemsPerPage }}
            itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
        />

        <AdminSection
            title="Video" isOpen={openAccordionId === 'videos'} onToggle={() => handleToggleAccordion('videos')} data={paginatedVideos} columns={articleColumns}
            renderRow={(video) => (
                <tr key={video.id}>
                    <td data-label="ID">{video.id}</td><td data-label="Datums">{formatDateToDDMMYYYY(video.date)}</td><td data-label="Nosaukums">{video.title}</td><td data-label="Autors">{video.authorName}</td><td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(video.created_at)}</td><td data-label="Darbības" className="admin-table-actions">
                        <button onClick={() => handleView('video', video.id)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => handleEdit('video', video.id)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => handleDelete('video', video.id)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                </tr>
            )}
            paginationProps={{ totalItems: videos.length, itemsPerPage: videosItemsPerPage, currentPage: videosCurrentPage, onPageChange: setVideosCurrentPage, onItemsPerPageChange: setVideosItemsPerPage }}
            itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
        />

        <Accordion
          title="Kartītes" isOpen={openAccordionId === 'cards'} onToggle={() => handleToggleAccordion('cards')}
          content={
            <>
              {Object.keys(groupedCardsByTheme).length === 0 ? <p>Nav nevienas kartītes.</p> : 
                Object.keys(groupedCardsByTheme).map(themeId => {
                  const themeCards = groupedCardsByTheme[themeId];
                  const theme = themes.find(t => t.id === parseInt(themeId, 10));
                  return (
                    <Accordion
                      key={themeId} title={`${theme ? theme.name : 'Nezināma tēma'} (${themeCards.length})`} isOpen={openCardThemeAccordionId === themeId} onToggle={() => handleToggleCardThemeAccordion(themeId)}
                      content={
                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                          <div className="admin-table-wrapper">
                            <table className="admin-data-table">
                                <colgroup>
                                  <col style={{ width: '40px' }} /><col style={{ width: '60px' }} /><col style={{ width: 'auto' }} /><col style={{ width: '195px' }} /><col style={{ width: '180px' }} /><col style={{ width: '120px' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th /><th data-label="ID">ID</th><th data-label="Nosaukums">Nosaukums</th><th data-label="Autors">Autors</th><th data-label="Izveidots">Izveidots</th><th data-label="Darbības">Darbības</th>
                                  </tr>
                                </thead>
                                <SortableContext items={themeCards.map(c => c.id)} strategy={verticalListSortingStrategy}>
                                    <tbody>
                                      {themeCards.map((card) => <SortableCardRow key={card.id} card={card} authors={authors} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />)}
                                    </tbody>
                                </SortableContext>
                            </table>
                          </div>
                        </DndContext>
                      }
                    />
                  )
                })
              }
            </>
          }
        />
      </div>
    </div>
  );
};

export default AdminPage;
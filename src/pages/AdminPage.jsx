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
import EditArticleForm from '../components/forms/EditArticleForm';
import EditVideoForm from '../components/forms/EditVideoForm';
import EditCardForm from '../components/forms/EditCardForm';
import ConfirmDeleteModal from '../components/common/Modals/ConfirmDeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { formatDateTimeToDDMMYYYYHHMM, formatDateToDDMMYYYY } from '../utils/dateUtils';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100, Infinity];

const SortableCardRowForOrdering = ({ card }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <tr ref={setNodeRef} style={style} {...attributes}>
            <td className="drag-handle" {...listeners}><FontAwesomeIcon icon={faGripVertical} /></td>
            <td data-label="ID">{card.id}</td>
            <td data-label="Nosaukums">{card.title}</td>
            <td data-label="Autors">{card.authorName}</td>
        </tr>
    );
};

const AdminPage = ({ authors, themes, articles, videos, cards, setAuthors, setThemesData, setCards, setArticles, setVideos, handleReadMore }) => {
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [openCardThemeAccordionId, setOpenCardThemeAccordionId] = useState(null);
  
  const [modalsState, setModalsState] = useState({ add: null, edit: null, delete: null });
  const [selectedItem, setSelectedItem] = useState(null);
  
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
  
  const [adminCardAuthorFilter, setAdminCardAuthorFilter] = useState('');
  const [adminCardThemeFilter, setAdminCardThemeFilter] = useState('');

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

  const paginatedAuthors = Array.isArray(authors) ? authors.slice((authorsCurrentPage - 1) * authorsItemsPerPage, authorsCurrentPage * authorsItemsPerPage) : [];
  const actualThemes = Array.isArray(themes) ? themes.filter(t => t.id !== 1 && t.id !== 'all') : [];
  const paginatedThemes = [...actualThemes].sort((a, b) => a.name.localeCompare(b.name)).slice((themesCurrentPage - 1) * themesItemsPerPage, themesCurrentPage * themesItemsPerPage);
  const paginatedArticles = Array.isArray(articles) ? [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice((articlesCurrentPage - 1) * articlesItemsPerPage, articlesCurrentPage * articlesItemsPerPage) : [];
  const paginatedVideos = Array.isArray(videos) ? [...videos].sort((a, b) => new Date(b.date) - new Date(a.date)).slice((videosCurrentPage - 1) * videosItemsPerPage, videosCurrentPage * videosItemsPerPage) : [];
  
  const filteredAdminCards = useMemo(() => {
    return cards
      .filter(card => {
        const authorMatch = !adminCardAuthorFilter || card.authorId === parseInt(adminCardAuthorFilter, 10);
        const themeMatch = !adminCardThemeFilter || card.theme === parseInt(adminCardThemeFilter, 10);
        return authorMatch && themeMatch;
      })
      .sort((a, b) => b.id - a.id);
  }, [cards, adminCardAuthorFilter, adminCardThemeFilter]);

  const paginatedAdminCards = filteredAdminCards.slice((cardsCurrentPage - 1) * cardsItemsPerPage, cardsCurrentPage * cardsItemsPerPage);

  const groupedCardsByThemeForSorting = useMemo(() => {
    return sortedCards.reduce((acc, card) => {
      const themeId = card.theme;
      if (!acc[themeId]) acc[themeId] = [];
      acc[themeId].push(card);
      return acc;
    }, {});
  }, [sortedCards]);

  const handleToggleAccordion = (id) => setOpenAccordionId(prevId => (prevId === id ? null : id));
  const handleToggleCardThemeAccordion = (id) => setOpenCardThemeAccordionId(prevId => (prevId === id ? null : id));
  
  const openModal = (type, itemType, item = null) => {
    setSelectedItem(item);
    setModalsState(prev => ({ ...prev, [type]: itemType }));
  };
  
  const closeModal = () => {
    setModalsState({ add: null, edit: null, delete: null });
    setSelectedItem(null);
  };
  
  const handleUpdate = (type, id, data) => {
    const settersMap = { 'autoru': setAuthors, 'tēmu': setThemesData, 'rakstu': setArticles, 'video': setVideos, 'kartīti': setCards };
    if (settersMap[type]) {
      settersMap[type](prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    }
    closeModal();
  };

  const confirmDelete = (type, id) => {
    const settersMap = { 'kartīti': setCards, 'rakstu': setArticles, 'video': setVideos, 'autoru': setAuthors, 'tēmu': setThemesData };
    if (settersMap[type]) {
      settersMap[type](prev => prev.filter(item => item.id !== id));
      alert(`Dzēsts: ${type} ar ID ${id}`);
    }
    closeModal();
  };
  
  const addHandlers = {
      author: (data) => { setAuthors(prev => [...prev, {id: Date.now(), ...data, created_at: new Date().toISOString()}]); closeModal(); },
      theme: (data) => { setThemesData(prev => [...prev, {id: Date.now(), ...data, created_at: new Date().toISOString()}]); closeModal(); },
      card: (data) => { setCards(prev => [...prev, {id: Date.now(), ...data, created_at: new Date().toISOString()}]); closeModal(); },
      article: (data) => { setArticles(prev => [...prev, {id: Date.now(), ...data, created_at: new Date().toISOString()}]); closeModal(); },
      video: (data) => { setVideos(prev => [...prev, {id: Date.now(), ...data, created_at: new Date().toISOString()}]); closeModal(); }
  };
  
  const authorColumns = [ { label: 'ID', width: '60px' }, { label: 'Vārds', width: 'auto' }, { label: 'Izveidots', width: '180px' }, { label: 'Darbības', width: '120px' }];
  const themeColumns = [ { label: 'ID', width: '60px' }, { label: 'Nosaukums', width: '150px' }, { label: 'Kopsavilkums', width: 'auto' }, { label: 'Izveidots', width: '180px' }, { label: 'Darbības', width: '120px' }];
  const articleColumns = [ { label: 'ID', width: '60px' }, { label: 'Datums', width: '120px' }, { label: 'Nosaukums', width: 'auto' }, { label: 'Autors', width: '195px' }, { label: 'Izveidots', width: '180px' }, { label: 'Darbības', width: '120px' }];
  const cardColumns = [ { label: 'ID', width: '60px' }, { label: 'Nosaukums', width: 'auto' }, { label: 'Tēma', width: '220px' }, { label: 'Autors', width: '195px' }, { label: 'Izveidots', width: '180px' }, { label: 'Darbības', width: '120px' }];

  return (
    <div className="admin-page-container">
      <h2 className="admin-page-title">Ierakstu pārvaldība</h2>
      
      <AdminActionButtons onShow={(type) => openModal('add', type)} />

      <AdminModals 
        modalsState={{ author: modalsState.add === 'author', theme: modalsState.add === 'theme', card: modalsState.add === 'card', article: modalsState.add === 'article', video: modalsState.add === 'video' }}
        handlers={{ add: addHandlers, onClose: closeModal }}
        data={{ themes, authors }}
      />
      
      {modalsState.delete && (
        <ConfirmDeleteModal 
            item={selectedItem}
            itemType={modalsState.delete}
            onClose={closeModal}
            onConfirm={confirmDelete}
        />
      )}
      
      {modalsState.edit && selectedItem && (
          <Modal isOpen={true} onClose={closeModal} title={`Rediģēt: ${selectedItem.name || selectedItem.title}`}>
              {modalsState.edit === 'autoru' && <EditAuthorForm author={selectedItem} onUpdateAuthor={(id, data) => handleUpdate('autoru', id, data)} onClose={closeModal} />}
              {modalsState.edit === 'tēmu' && <EditThemeForm theme={selectedItem} onUpdateTheme={(id, data) => handleUpdate('tēmu', id, data)} onClose={closeModal} />}
              {modalsState.edit === 'rakstu' && <EditArticleForm item={selectedItem} availableAuthors={authors} onUpdate={handleUpdate} onClose={closeModal} />}
              {modalsState.edit === 'video' && <EditVideoForm item={selectedItem} availableAuthors={authors} onUpdate={handleUpdate} onClose={closeModal} />}
              {modalsState.edit === 'kartīti' && <EditCardForm card={selectedItem} onUpdateCard={(id, data) => handleUpdate('kartīti', id, data)} availableThemes={themes} availableAuthors={authors} onClose={closeModal} />}
          </Modal>
      )}
      
      <div className="admin-content-sections">
        <AdminSection
            title="Autori" isOpen={openAccordionId === 'authors'} onToggle={() => handleToggleAccordion('authors')} data={paginatedAuthors} columns={authorColumns}
            renderRow={(author) => (
                <tr key={author.id}>
                    <td data-label="ID">{author.id}</td><td data-label="Vārds">{author.name}</td><td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(author.created_at)}</td><td data-label="Darbības" className="admin-table-actions">
                        <button onClick={() => openModal('view', 'autoru', author)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => openModal('edit', 'autoru', author)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => openModal('delete', 'autoru', author)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                         <button onClick={() => openModal('view', 'tēmu', theme)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                         <button onClick={() => openModal('edit', 'tēmu', theme)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                         <button onClick={() => openModal('delete', 'tēmu', theme)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                        <button onClick={() => handleReadMore(article)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => openModal('edit', 'rakstu', article)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => openModal('delete', 'rakstu', article)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                        <button onClick={() => handleReadMore(video)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => openModal('edit', 'video', video)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => openModal('delete', 'video', video)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                </tr>
            )}
            paginationProps={{ totalItems: videos.length, itemsPerPage: videosItemsPerPage, currentPage: videosCurrentPage, onPageChange: setVideosCurrentPage, onItemsPerPageChange: setVideosItemsPerPage }}
            itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
        />
        
        <AdminSection
          title="Ieteikumi"
          isOpen={openAccordionId === 'cardsAdmin'}
          onToggle={() => handleToggleAccordion('cardsAdmin')}
          data={paginatedAdminCards}
          columns={cardColumns}
          renderRow={(card) => (
              <tr key={card.id}>
                  <td data-label="ID">{card.id}</td>
                  <td data-label="Nosaukums">{card.title}</td>
                  <td data-label="Tēma">{card.themeName}</td>
                  <td data-label="Autors">{card.authorName}</td>
                  <td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(card.created_at)}</td>
                  <td data-label="Darbības" className="admin-table-actions">
                      <button onClick={() => handleReadMore(card)} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                      <button onClick={() => openModal('edit', 'kartīti', card)} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                      <button onClick={() => openModal('delete', 'kartīti', card)} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
                  </td>
              </tr>
          )}
          paginationProps={{
            totalItems: filteredAdminCards.length,
            itemsPerPage: cardsItemsPerPage,
            currentPage: cardsCurrentPage,
            onPageChange: setCardsCurrentPage,
            onItemsPerPageChange: setCardsItemsPerPage
          }}
          itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
        >
          <div className="admin-table-filters" style={{ display: 'flex', gap: '15px', marginBottom: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
            <select value={adminCardAuthorFilter} onChange={(e) => setAdminCardAuthorFilter(e.target.value)} style={{ padding: '8px' }}>
              <option value="">Filtrēt pēc autora</option>
              {authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
            </select>
            <select value={adminCardThemeFilter} onChange={(e) => setAdminCardThemeFilter(e.target.value)} style={{ padding: '8px' }}>
              <option value="">Filtrēt pēc tēmas</option>
              {themes.filter(t => t.id !== 'all').map(theme => <option key={theme.id} value={theme.id}>{theme.name}</option>)}
            </select>
          </div>
        </AdminSection>
        
        <Accordion
          title="Ieteikumu secība"
          isOpen={openAccordionId === 'cardsOrdering'}
          onToggle={() => handleToggleAccordion('cardsOrdering')}
          content={
            <>
              {Object.keys(groupedCardsByThemeForSorting).length === 0 ? <p>Nav nevienas kartītes.</p> : 
                Object.keys(groupedCardsByThemeForSorting).map(themeId => {
                  const themeCards = groupedCardsByThemeForSorting[themeId];
                  const theme = themes.find(t => t.id === parseInt(themeId, 10));
                  return (
                    <Accordion
                      key={themeId}
                      title={`${theme ? theme.name : 'Nezināma tēma'} (${themeCards.length})`}
                      isOpen={openCardThemeAccordionId === themeId}
                      onToggle={() => handleToggleCardThemeAccordion(themeId)}
                      content={
                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                          <div className="admin-table-wrapper">
                            <table className="admin-data-table">
                              <colgroup>
                                <col style={{ width: '40px' }} />
                                <col style={{ width: '60px' }} />
                                <col style={{ width: 'auto' }} />
                                <col style={{ width: '195px' }} />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th />
                                  <th data-label="ID">ID</th>
                                  <th data-label="Nosaukums">Nosaukums</th>
                                  <th data-label="Autors">Autors</th>
                                </tr>
                              </thead>
                              <SortableContext items={themeCards.map(c => c.id)} strategy={verticalListSortingStrategy}>
                                <tbody>
                                  {themeCards.map((card) => <SortableCardRowForOrdering key={card.id} card={card} />)}
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
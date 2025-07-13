// src/pages/AdminPage.jsx
import React, { useState, useEffect, useMemo, Suspense } from 'react';
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
import { faEdit, faTrashAlt, faEye, faGripVertical, faSave } from '@fortawesome/free-solid-svg-icons';
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

// LABOTS: Saņemam addEntity, updateEntity, deleteEntity no App.jsx
const AdminPage = ({ authors, themes, articles, videos, cards, addEntity, updateEntity, deleteEntity, openModal }) => {
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [openCardThemeAccordionId, setOpenCardThemeAccordionId] = useState(null);
  
  const [editModalState, setEditModalState] = useState({ item: null, type: null });
  const [deleteModalState, setDeleteModalState] = useState({ item: null, type: null });
  const [addModalsState, setAddModalsState] = useState({ author: false, theme: false, card: false, article: false, video: false });

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
  const [isOrderChanged, setIsOrderChanged] = useState(false); // Jauns stāvoklis pogai

  useEffect(() => { 
    setSortedCards(cards);
    setIsOrderChanged(false);
  }, [cards]);

  const handleDragEnd = (event) => {
    const {active, over} = event;
    if (active.id !== over.id) {
      setSortedCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        setIsOrderChanged(true); // Uzstādām, ka secība ir mainīta
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  
  const handleSaveOrder = async () => { // Padarīts asinhroni, jo nākotnē būs API izsaukums
    // TODO: Šeit būtu jāīsteno API izsaukums, lai nosūtītu jauno secību uz serveri
    // Piemēram: await updateEntity('cardOrder', null, { order: sortedCards.map(c => c.id) });
    console.log("Jaunā kartīšu secība (simulācija):", sortedCards.map(c => c.id));
    alert("Secība saglabāta (simulācija)! Reālā aplikācijā šeit būtu API izsaukums.");
    setIsOrderChanged(false); // Paslēpjam pogu
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
  
  const handleShowAddModal = (type) => setAddModalsState(prev => ({ ...prev, [type]: true }));
  const handleCloseAddModal = (type) => setAddModalsState(prev => ({ ...prev, [type]: false }));
  
  const handleEdit = (item, type) => setEditModalState({ item, type });
  const handleDelete = (item, type) => setDeleteModalState({ item, type });
  
  const closeModal = () => {
    setEditModalState({ item: null, type: null });
    setDeleteModalState({ item: null, type: null });
  };
  
  // LABOTS: Šīs funkcijas izsauc updateEntity
  const handleUpdateAndRefresh = async (type, id, data) => {
    try {
        await updateEntity(type, id, data); // Izsauc centralizēto updateEntity
        alert(`${type} veiksmīgi atjaunināts!`);
        closeModal();
    } catch (error) {
        alert(`Kļūda, atjauninot ${type}: ${error.message}`);
    }
  };

  // LABOTS: Šī funkcija izsauc deleteEntity
  const confirmDeleteAndRefresh = async (type, id) => {
    try {
        await deleteEntity(type, id); // Izsauc centralizēto deleteEntity
        alert(`${type} veiksmīgi dzēsts!`);
        closeModal();
    } catch (error) {
        alert(`Kļūda, dzēšot ${type}: ${error.message}`);
    }
  };
  
  // LABOTS: Šīs funkcijas izsauc addEntity
  const addHandlers = {
      author: async (data) => {
        try {
            await addEntity('author', data);
            alert('Autors veiksmīgi pievienots!');
            handleCloseAddModal('author');
        } catch (error) {
            alert(`Kļūda, pievienojot autoru: ${error.message}`);
        }
      },
      theme: async (data) => {
        try {
            await addEntity('theme', data);
            alert('Tēma veiksmīgi pievienota!');
            handleCloseAddModal('theme');
        } catch (error) {
            alert(`Kļūda, pievienojot tēmu: ${error.message}`);
        }
      },
      card: async (data) => {
        try {
            await addEntity('card', data);
            alert('Kartīte veiksmīgi pievienota!');
            handleCloseAddModal('card');
        } catch (error) {
            alert(`Kļūda, pievienojot kartīti: ${error.message}`);
        }
      },
      article: async (data) => {
        try {
            await addEntity('article', data);
            alert('Raksts veiksmīgi pievienots!');
            handleCloseAddModal('article');
        } catch (error) {
            alert(`Kļūda, pievienojot rakstu: ${error.message}`);
        }
      },
      video: async (data) => {
        try {
            await addEntity('video', data);
            alert('Video veiksmīgi pievienots!');
            handleCloseAddModal('video');
        } catch (error) {
            alert(`Kļūda, pievienojot video: ${error.message}`);
        }
      }
  };
  
  const authorColumns = [ { label: 'ID', width: '60px' }, { label: 'Vārds', width: 'auto' }, { label: 'Izveidots', width: '180px' }, { label: 'Darbības', width: '120px' }];
  const themeColumns = [ { label: 'ID', width: '60px' }, { label: 'Nosaukums', width: '150px' }, { label: 'Kopsavilkums', width: 'auto' }, { label: 'Izveidots', width: '180px' }, { label: 'Darbības', width: '120px' }];
  const articleColumns = [ { label: 'ID', width: '60px' }, { label: 'Datums', width: '120px' }, { label: 'Nosaukums', width: 'auto' }, { label: 'Autors', width: '195px' }, { label: 'Izveidots', width: '180px' }, { label: 'Darbības', width: '120px' }];
  const cardColumns = [ { label: 'ID', width: '60px' }, { label: 'Nosaukums', width: 'auto' }, { label: 'Tēma', width: '220px' }, { label: 'Autors', width: '195px' }, { label: 'Izveidots', width: '180px' }, { label: 'Darbības', width: '120px' }];

  return (
    <div className="admin-page-container">
      <h2 className="admin-page-title">Ierakstu pārvaldība</h2>
      
      <AdminActionButtons onShow={handleShowAddModal} />

      <AdminModals 
        modalsState={addModalsState}
        handlers={{ add: addHandlers, onClose: handleCloseAddModal }}
        data={{ themes, authors }}
      />
      
      {deleteModalState.item && (
        <ConfirmDeleteModal 
            item={deleteModalState.item}
            itemType={deleteModalState.type}
            onClose={closeModal}
            onConfirm={confirmDeleteAndRefresh} // Izsauc jauno funkciju
        />
      )}
      
      {editModalState.item && (
          <Modal isOpen={true} onClose={closeModal} title={`Rediģēt: ${editModalState.item.name || editModalState.item.title}`}>
              {editModalState.type === 'autoru' && <EditAuthorForm author={editModalState.item} onUpdateAuthor={(id, data) => handleUpdateAndRefresh('author', id, data)} onClose={closeModal} />}
              {editModalState.type === 'tēmu' && <EditThemeForm theme={editModalState.item} onUpdateTheme={(id, data) => handleUpdateAndRefresh('theme', id, data)} onClose={closeModal} />}
              {editModalState.type === 'rakstu' && <EditArticleForm item={editModalState.item} availableAuthors={authors} onUpdate={(type, id, data) => handleUpdateAndRefresh(type, id, data)} onClose={closeModal} />}
              {editModalState.type === 'video' && <EditVideoForm item={editModalState.item} availableAuthors={authors} onUpdate={(type, id, data) => handleUpdateAndRefresh(type, id, data)} onClose={closeModal} />}
              {editModalState.type === 'kartīti' && <EditCardForm card={editModalState.item} onUpdateCard={(id, data) => handleUpdateAndRefresh('card', id, data)} availableThemes={themes} availableAuthors={authors} onClose={closeModal} />}
          </Modal>
      )}
      
      <div className="admin-content-sections">
        <AdminSection
            title="Autori" isOpen={openAccordionId === 'authors'} onToggle={() => handleToggleAccordion('authors')} data={paginatedAuthors} columns={authorColumns}
            renderRow={(author) => (
                <tr key={author.id}>
                    <td data-label="ID">{author.id}</td><td data-label="Vārds">{author.name}</td><td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(author.created_at)}</td><td data-label="Darbības" className="admin-table-actions">
                        <button onClick={() => openModal(author, 'autoru')} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => handleEdit(author, 'autoru')} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => handleDelete(author, 'autoru')} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                             <button onClick={() => openModal(theme, 'tēmu')} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                             <button onClick={() => handleEdit(theme, 'tēmu')} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                             <button onClick={() => handleDelete(theme, 'tēmu')} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                            <button onClick={() => openModal(article, 'rakstu')} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                            <button onClick={() => handleEdit(article, 'rakstu')} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                            <button onClick={() => handleDelete(article, 'rakstu')} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                            <button onClick={() => openModal(video, 'video')} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                            <button onClick={() => handleEdit(video, 'video')} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                            <button onClick={() => handleDelete(video, 'video')} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                          <button onClick={() => openModal(card, 'card')} className="admin-table-button view-button"><FontAwesomeIcon icon={faEye} /></button>
                          <button onClick={() => handleEdit(card, 'kartīti')} className="admin-table-button edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                          <button onClick={() => handleDelete(card, 'kartīti')} className="admin-table-button delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                  {isOrderChanged && (
                    <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                      <button onClick={handleSaveOrder} className="admin-action-button" style={{ maxWidth: '200px' }}>
                        <FontAwesomeIcon icon={faSave} /> Saglabāt secību
                      </button>
                    </div>
                  )}
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
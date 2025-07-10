// src/pages/AdminPage.jsx
import React, { useState } from 'react'; // Importējam React un useState hooku
import './AdminPage.css'; // Importējam šīs lapas stilus
import Accordion from '../components/common/Accordion/Accordion'; // Importējam Accordion komponenti
import Pagination from '../components/common/Pagination/Pagination'; // Importējam Pagination komponenti
import Modal from '../components/common/Modals/Modal'; // Importējam Modal komponenti
import CardForm from '../components/forms/CardForm/CardForm'; // Importējam CardForm komponenti
import AddAuthorForm from '../components/forms/AddAuthorForm'; // Importējam AddAuthorForm
import AddThemeForm from '../components/forms/AddThemeForm'; // Importējam AddThemeForm
import AddArticleForm from '../components/forms/AddArticleForm'; // Importējam AddArticleForm
import AddVideoForm from '../components/forms/AddVideoForm'; // Importējam AddVideoForm

// Importējam FontAwesome ikonas
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';

// Importējam datuma formatēšanas palīgfunkcijas
import { formatDateTimeToDDMMYYYYHHMM, formatDateToDDMMYYYY } from '../utils/dateUtils';

import config from '/src/config';

// Lapošanas opcijas ierakstiem tabulās
const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100, Infinity];

/**
 * Administratora lapas komponente.
 * Nodrošina datu pārvaldību (autori, tēmas, raksti, video, kartītes)
 * un formas jaunu ierakstu pievienošanai.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.authors - Autoru masīvs.
 * @param {Array<object>} props.themes - Tēmu masīvs.
 * @param {Array<object>} props.articles - Rakstu masīvs.
 * @param {Array<object>} props.videos - Video masīvs.
 * @param {Array<object>} props.cards - Kartīšu masīvs.
 * @param {function} props.setAuthors - Funkcija autoru stāvokļa atjaunināšanai.
 * @param {function} props.setThemesData - Funkcija tēmu stāvokļa atjaunināšanai.
 * @param {function} props.setCards - Funkcija karšu stāvokļa atjaunināšanai.
 * @param {function} props.setArticles - Funkcija rakstu stāvokļa atjaunināšanai.
 * @param {function} props.setVideos - Funkcija video stāvokļa atjaunināšanai.
 */
const AdminPage = ({ authors, themes, articles, videos, cards, setAuthors, setThemesData, setCards, setArticles, setVideos }) => {
  // Stāvoklis, kas kontrolē, kurš akordeons ir atvērts
  const [openAccordionId, setOpenAccordionId] = useState(null);

  // Modālo logu stāvokļi pievienošanas formām
  const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = useState(false);
  const [isAddThemeModalOpen, setIsAddThemeModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isAddArticleModalOpen, setIsAddArticleModalOpen] = useState(false);
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);

  // Lapošanas stāvokļi katrai tabulai administratora lapā
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

  // Lapoti datu saraksti, ko attēlot tabulās
  const paginatedAuthors = Array.isArray(authors) ? authors.slice(
    (authorsCurrentPage - 1) * authorsItemsPerPage,
    (authorsCurrentPage - 1) * authorsItemsPerPage + authorsItemsPerPage
  ) : [];

  // Filtrējam "Sākums" (ID 1) un "Visas" (ID 2) tēmas no administratora skata, un sakārtojam tās alfabētiski
  const actualThemes = Array.isArray(themes) ? themes.filter(t => t.id !== 1 && t.id !== 2) : [];
  const paginatedThemes = [...actualThemes].sort((a, b) => a.name.localeCompare(b.name)).slice(
    (themesCurrentPage - 1) * themesItemsPerPage,
    (themesCurrentPage - 1) * themesItemsPerPage + themesItemsPerPage
  );

  // Sakārtojam rakstus pēc datuma dilstošā secībā
  const paginatedArticles = Array.isArray(articles) ? [...articles].sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  }).slice(
    (articlesCurrentPage - 1) * articlesItemsPerPage,
    (articlesCurrentPage - 1) * articlesItemsPerPage + articlesItemsPerPage
  ) : [];

  // Sakārtojam video pēc datuma dilstošā secībā
  const paginatedVideos = Array.isArray(videos) ? [...videos].sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  }).slice(
    (videosCurrentPage - 1) * videosItemsPerPage,
    (videosCurrentPage - 1) * videosItemsPerPage + videosItemsPerPage
  ) : [];

  // Piezīme: Kartītēm simulācijā nav secības, tāpēc vienkārši lapojam esošo secību
  const paginatedCards = Array.isArray(cards) ? cards.slice(
    (cardsCurrentPage - 1) * cardsItemsPerPage,
    (cardsCurrentPage - 1) * cardsItemsPerPage + cardsItemsPerPage
  ) : [];

  /**
   * Pārslēdz akordeona atvēršanas stāvokli.
   * @param {string} id - Akordeona ID.
   */
  const handleToggleAccordion = (id) => {
    setOpenAccordionId(prevId => (prevId === id ? null : id));
  };

  // Simulētas darbības (skatīšanās, rediģēšana, dzēšana)
  const handleView = (type, id) => {
    alert(`Skatīt: ${type} ar ID ${id}`);
    // Šeit nākotnē varētu atvērt detalizētu modālo logu ar attiecīgā ieraksta informāciju
  };

  const handleEdit = (type, id) => {
    alert(`Rediģēt: ${type} ar ID ${id}`);
    // Šeit nākotnē varētu atvērt rediģēšanas formu modālajā logā ar attiecīgā ieraksta datiem
  };

  const handleDelete = (type, id) => {
    if (window.confirm(`Vai tiešām vēlaties dzēst ${type} ar ID ${id}?`)) {
      // Šeit nākotnē būtu API izsaukums datu dzēšanai
      // Simulē dzēšanu no stāvokļa
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

  // Pievienošanas funkcijas (simulēta datu pievienošana)
 const addAuthor = async (newAuthorData) => {
    try {
      // Veicam POST pieprasījumu uz backend
      const response = await fetch(`${config.API_BASE_URL}/authors`, { //
        method: 'POST', //
        headers: {
          'Content-Type': 'application/json', //
        },
        body: JSON.stringify(newAuthorData), //
      });

      const responseData = await response.json(); //

      if (!response.ok) { // Ja atbilde nav OK (piem., 400, 409, 500)
        // Ja ir validācijas kļūdas, tās būs responseData.error
        const errorMessage = responseData.messages?.error || responseData.error?.name || 'Neizdevās pievienot autoru.';
        alert(`Kļūda: ${errorMessage}`);
        console.error('API kļūda pievienojot autoru:', responseData);
        return;
      }

      // Ja pievienošana ir veiksmīga, atjauninām frontend stāvokli ar datiem no backend
      setAuthors(prev => [...prev, responseData.data]); //
      setIsAddAuthorModalOpen(false);
      alert("Autors veiksmīgi pievienots!");
    } catch (error) {
      console.error('Kļūda pievienojot autoru:', error);
      alert('Neizdevās pievienot autoru: Servera vai tīkla kļūda.');
    }
  };

  const addTheme = async (newThemeData) => {
    console.log("Adding theme:", newThemeData);
    // Tēmas ID ģenerēšana: ja ir kāda galvenā navigācijas tēma, izmanto tās esošo ID, citādi ģenerē jaunu
    // Piezīme: Ja jaunās tēmas nosaukums sakrīt ar galvenās navigācijas tēmu (Sākums, Biedrība, Tirdzniecība, Stāsti, Izdrukām),
    // tad izmantosim to ID. Pretējā gadījumā ģenerēsim jaunu.
    const mainNavThemeIds = { // Mapējam nosaukumu uz ID
        "Sākums": 1,
        "Visas": 2, // Lai gan "Visas" netiks pievienotas kā jauna tēma, saglabājam to te
        "Biedrība": 104,
        "Tirdzniecība": 105,
        "Stāsti": 106,
        "Izdrukām": 107
    };
    let newId;
    if (mainNavThemeIds[newThemeData.name]) {
        newId = mainNavThemeIds[newThemeData.name];
    } else {
        newId = Date.now(); // Jauna skaitliska ID ģenerēšana
    }

    setThemesData(prev => [...prev, { ...newThemeData, id: newId, created_at: new Date().toISOString() }]);
    setIsAddThemeModalOpen(false);
    alert("Tēma pievienota (simulācija)!");
  };

  const addCard = async (newCardData) => {
    console.log('Adding card:', newCardData);
    // Simulē API atbildi
    const response = await new Promise(resolve => setTimeout(() => {
        const savedCard = { ...newCardData, id: Date.now() }; // Skaitlisks ID
        let finalAuthorId = newCardData.authorId;
        // Apstrādā jauna autora pievienošanu kartītei
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
        // Apstrādā jaunas tēmas pievienošanu kartītei
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
            // Ja izvēlēta esoša tēma, atrodam tās ID
            const existingTheme = themes.find(t => t.name === newCardData.theme);
            if (existingTheme) {
                finalThemeId = existingTheme.id;
            } else {
                console.warn("Kartītes tēma netika atrasta (esošās tēmas gadījumā)!");
                finalThemeId = null;
            }
        }

        // Apstrādā attēlu autorus
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

    // Atjaunina kartīšu stāvokli ar jaunajiem datiem un atrastajiem/pievienotajiem autoru/tēmu nosaukumiem
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
    // Apstrādā jauna autora pievienošanu rakstam
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
    // Apstrādā jauna autora pievienošanu video
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

  return (
    <div className="admin-page-container">
      <h2 className="admin-page-title">Ierakstu pārvaldība</h2>

      {/* Darbību pogas jaunu ierakstu pievienošanai */}
      <div className="admin-action-buttons">
        <button className="admin-action-button" onClick={() => setIsAddAuthorModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Pievienot autoru</button>
        <button className="admin-action-button" onClick={() => setIsAddThemeModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Pievienot tēmu</button>
        <button className="admin-action-button" onClick={() => setIsAddCardModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Pievienot kartīti</button>
        <button className="admin-action-button" onClick={() => setIsAddArticleModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Pievienot rakstu</button>
        <button className="admin-action-button" onClick={() => setIsAddVideoModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Pievienot video</button>
      </div>

      {/* Modālie logi pievienošanas formām */}
      <Modal isOpen={isAddAuthorModalOpen} onClose={() => setIsAddAuthorModalOpen(false)} title="Pievienot autoru">
        <AddAuthorForm onAddAuthor={addAuthor} onClose={() => setIsAddAuthorModalOpen(false)} availableAuthors={authors} />
      </Modal>

      <Modal isOpen={isAddThemeModalOpen} onClose={() => setIsAddThemeModalOpen(false)} title="Pievienot tēmu">
        <AddThemeForm onAddTheme={addTheme} onClose={() => setIsAddThemeModalOpen(false)} />
      </Modal>

      <Modal isOpen={isAddCardModalOpen} onClose={() => setIsAddCardModalOpen(false)} title="Pievienot kartīti">
        <CardForm
          onAddCard={addCard}
          // availableThemes tiek filtrētas, lai izslēgtu "Sākums" (ID 1) un "Visas" (ID 2)
          // Un citas galvenās navigācijas tēmas, kurām ir fiksēta pozīcija un nav paredzēts tās pievienot caur formu
          availableThemes={themes.filter(t => ![1, 2, 104, 105, 106, 107].includes(t.id)).map(t => t.name)}
          availableAuthors={authors}
          allowHomepageTheme={true} // Atļauj "Sākums" tēmu priekš kartītēm
        />
      </Modal>

      <Modal isOpen={isAddArticleModalOpen} onClose={() => setIsAddArticleModalOpen(false)} title="Pievienot rakstu">
        <AddArticleForm onAddArticle={addArticle} onClose={() => setIsAddArticleModalOpen(false)} availableAuthors={authors} />
      </Modal>

      <Modal isOpen={isAddVideoModalOpen} onClose={() => setIsAddVideoModalOpen(false)} title="Pievienot video">
        <AddVideoForm onAddVideo={addVideo} onClose={() => setIsAddVideoModalOpen(false)} availableAuthors={authors} />
      </Modal>


      {/* Datu tabulu sekcijas (katra akordeonā) */}
      <div className="admin-content-sections">
        {/* Autoru tabula */}
        <Accordion
          title="Autori"
          isOpen={openAccordionId === 'authors'}
          onToggle={() => handleToggleAccordion('authors')}
          content={
            <>
              {paginatedAuthors.length === 0 ? (
                <p>Nav neviena autora.</p>
              ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-data-table">
                        <colgroup>
                            <col style={{ width: '60px' }} /><col style={{ width: 'auto' }} /><col style={{ width: '180px' }} /><col style={{ width: '120px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th data-label="ID">ID</th>
                                <th data-label="Vārds">Vārds</th>
                                <th data-label="Izveidots">Izveidots</th>
                                <th data-label="Darbības">Darbības</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedAuthors.map(author => (
                                <tr key={author.id}>
                                    <td data-label="ID">{author.id}</td>
                                    <td data-label="Vārds">{author.name}</td>
                                    <td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(author.created_at)}</td>
                                    <td data-label="Darbības" className="admin-table-actions">
                                        <button onClick={() => handleView('autoru', author.id)} className="admin-table-button view-button">
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                        <button onClick={() => handleEdit('autoru', author.id)} className="admin-table-button edit-button">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => handleDelete('autoru', author.id)} className="admin-table-button delete-button">
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              )}
              <Pagination
                totalItems={Array.isArray(authors) ? authors.length : 0}
                itemsPerPage={authorsItemsPerPage}
                currentPage={authorsCurrentPage}
                onPageChange={setAuthorsCurrentPage}
                onItemsPerPageChange={setAuthorsItemsPerPage}
                itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
              />
            </>
          }
        />

        {/* Tēmu tabula */}
        <Accordion
          title="Tēmas"
          isOpen={openAccordionId === 'themes'}
          onToggle={() => handleToggleAccordion('themes')}
          content={
            <>
              {paginatedThemes.length === 0 ? (
                <p>Nav nevienas tēmas.</p>
              ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-data-table">
                        <colgroup>
                            <col style={{ width: '60px' }} /><col style={{ width: '150px' }} /><col style={{ width: 'auto' }} /><col style={{ width: '180px' }} /><col style={{ width: '120px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th data-label="ID">ID</th>
                                <th data-label="Nosaukums">Nosaukums</th>
                                <th data-label="Kopsavilkums">Kopsavilkums</th>
                                <th data-label="Izveidots">Izveidots</th>
                                <th data-label="Darbības">Darbības</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedThemes.map(theme => (
                                <tr key={theme.id}>
                                    <td data-label="ID">{theme.id}</td>
                                    <td data-label="Nosaukums">{theme.name}</td>
                                    <td data-label="Kopsavilkums">{theme.summary || 'Nav kopsavilkuma'}</td>
                                    <td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(theme.created_at)}</td>
                                    <td data-label="Darbības" className="admin-table-actions">
                                        <button onClick={() => handleView('tēmu', theme.id)} className="admin-table-button view-button">
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                        <button onClick={() => handleEdit('tēmu', theme.id)} className="admin-table-button edit-button">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => handleDelete('tēmu', theme.id)} className="admin-table-button delete-button">
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              )}
              <Pagination
                totalItems={actualThemes.length}
                itemsPerPage={themesItemsPerPage}
                currentPage={themesCurrentPage}
                onPageChange={setThemesCurrentPage}
                onItemsPerPageChange={setThemesItemsPerPage}
                itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
              />
            </>
          }
        />

        {/* Rakstu tabula */}
        <Accordion
          title="Raksti"
          isOpen={openAccordionId === 'articles'}
          onToggle={() => handleToggleAccordion('articles')}
          content={
            <>
              {paginatedArticles.length === 0 ? (
                <p>Nav neviena raksta.</p>
              ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-data-table">
                        <colgroup>
                            <col style={{ width: '60px' }} /><col style={{ width: '120px' }} /><col style={{ width: 'auto' }} /><col style={{ width: '195px' }} /><col style={{ width: '180px' }} /><col style={{ width: '120px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th data-label="ID">ID</th>
                                <th data-label="Datums">Datums</th>
                                <th data-label="Nosaukums">Nosaukums</th>
                                <th data-label="Autors">Autors</th>
                                <th data-label="Izveidots">Izveidots</th>
                                <th data-label="Darbības">Darbības</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedArticles.map(article => (
                                <tr key={article.id}>
                                    <td data-label="ID">{article.id}</td>
                                    <td data-label="Datums">{formatDateToDDMMYYYY(article.date)}</td>
                                    <td data-label="Nosaukums">{article.title}</td>
                                    <td data-label="Autors">{authors.find(a => a.id === article.authorId)?.name || 'N/A'}</td>
                                    <td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(article.created_at)}</td>
                                    <td data-label="Darbības" className="admin-table-actions">
                                        <button onClick={() => handleView('rakstu', article.id)} className="admin-table-button view-button">
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                        <button onClick={() => handleEdit('rakstu', article.id)} className="admin-table-button edit-button">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => handleDelete('rakstu', article.id)} className="admin-table-button delete-button">
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              )}
              <Pagination
                totalItems={Array.isArray(articles) ? articles.length : 0}
                itemsPerPage={articlesItemsPerPage}
                currentPage={articlesCurrentPage}
                onPageChange={setArticlesCurrentPage}
                onItemsPerPageChange={setArticlesItemsPerPage}
                itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
              />
            </>
          }
        />

        {/* Video tabula */}
        <Accordion
          title="Video"
          isOpen={openAccordionId === 'videos'}
          onToggle={() => handleToggleAccordion('videos')}
          content={
            <>
              {paginatedVideos.length === 0 ? (
                <p>Nav neviena video.</p>
              ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-data-table">
                        <colgroup>
                            <col style={{ width: '60px' }} /><col style={{ width: '120px' }} /><col style={{ width: 'auto' }} /><col style={{ width: '195px' }} /><col style={{ width: '180px' }} /><col style={{ width: '120px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th data-label="ID">ID</th>
                                <th data-label="Datums">Datums</th>
                                <th data-label="Nosaukums">Nosaukums</th>
                                <th data-label="Autors">Autors</th>
                                <th data-label="Izveidots">Izveidots</th>
                                <th data-label="Darbības">Darbības</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedVideos.map(video => (
                                <tr key={video.id}>
                                    <td data-label="ID">{video.id}</td>
                                    <td data-label="Datums">{formatDateToDDMMYYYY(video.date)}</td>
                                    <td data-label="Nosaukums">{video.title}</td>
                                    <td data-label="Autors">{authors.find(a => a.id === video.authorId)?.name || 'N/A'}</td>
                                    <td data-label="Izveidots">{formatDateTimeToDDMMYYYYHHMM(video.created_at)}</td>
                                    <td data-label="Darbības" className="admin-table-actions">
                                        <button onClick={() => handleView('video', video.id)} className="admin-table-button view-button">
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                        <button onClick={() => handleEdit('video', video.id)} className="admin-table-button edit-button">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => handleDelete('video', video.id)} className="admin-table-button delete-button">
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              )}
              <Pagination
                totalItems={Array.isArray(videos) ? videos.length : 0}
                itemsPerPage={videosItemsPerPage}
                currentPage={videosCurrentPage}
                onPageChange={setVideosCurrentPage}
                onItemsPerPageChange={setVideosItemsPerPage}
                itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
              />
            </>
          }
        />
        {/* Kartīšu tabula */}
        <Accordion
          title="Kartītes"
          isOpen={openAccordionId === 'cards'}
          onToggle={() => handleToggleAccordion('cards')}
          content={
            <>
              {paginatedCards.length === 0 ? (
                <p>Nav nevienas kartītes.</p>
              ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-data-table">
                        <colgroup>
                            <col style={{ width: '60px' }} /><col style={{ width: 'auto' }} /><col style={{ width: '150px' }} /><col style={{ width: '195px' }} /><col style={{ width: '180px' }} /><col style={{ width: '120px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th data-label="ID">ID</th>
                                <th data-label="Nosaukums">Nosaukums</th>
                                <th data-label="Tēma">Tēma</th>
                                <th data-label="Autors">Autors</th>
                                <th data-label="Izveidots">Izveidots</th>
                                <th data-label="Darbības">Darbības</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCards.map(card => (
                                <tr key={card.id}>
                                    <td data-label="ID">{card.id}</td>
                                    <td data-label="Nosaukums">{card.title}</td>
                                    {/* Atrod tēmas nosaukumu pēc ID */}
                                    <td data-label="Tēma">{themes.find(t => t.id === card.theme)?.name || 'N/A'}</td>
                                    {/* Atrod autora nosaukumu pēc ID */}
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
                            ))}
                        </tbody>
                    </table>
                </div>
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

export default AdminPage; // Eksportējam komponenti
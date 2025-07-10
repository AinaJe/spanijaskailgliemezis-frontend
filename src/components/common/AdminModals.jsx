// src/components/common/AdminModals.jsx
import React from 'react';
import Modal from './Modals/Modal';
import AddAuthorForm from '../forms/AddAuthorForm';
import AddThemeForm from '../forms/AddThemeForm';
import CardForm from '../forms/CardForm/CardForm';
import AddArticleForm from '../forms/AddArticleForm';
import AddVideoForm from '../forms/AddVideoForm';

const AdminModals = ({ modalsState, handlers, data }) => {
  const { themes, authors } = data;
  const { onAddAuthor, onAddTheme, onAddCard, onAddArticle, onAddVideo } = handlers.add;
  const { onClose } = handlers;

  // Tēmas, kuras var piešķirt jaunai kartītei (izslēdzam tikai 'Visi')
  const cardAssignableThemes = themes.filter(t => t.id !== 'all');

  return (
    <>
      <Modal isOpen={modalsState.author} onClose={() => onClose('author')} title="Pievienot autoru">
        <AddAuthorForm onAddAuthor={onAddAuthor} onClose={() => onClose('author')} availableAuthors={authors} />
      </Modal>

      <Modal isOpen={modalsState.theme} onClose={() => onClose('theme')} title="Pievienot tēmu">
        <AddThemeForm onAddTheme={onAddTheme} onClose={() => onClose('theme')} />
      </Modal>

      <Modal isOpen={modalsState.card} onClose={() => onClose('card')} title="Pievienot kartīti">
        <CardForm
          onAddCard={onAddCard}
          availableThemes={cardAssignableThemes} // Padodam objektu masīvu
          availableAuthors={authors}
          allowHomepageTheme={false} // Vairs nav nepieciešams, jo Sākums jau ir sarakstā
        />
      </Modal>

      <Modal isOpen={modalsState.article} onClose={() => onClose('article')} title="Pievienot rakstu">
        <AddArticleForm onAddArticle={onAddArticle} onClose={() => onClose('article')} availableAuthors={authors} />
      </Modal>

      <Modal isOpen={modalsState.video} onClose={() => onClose('video')} title="Pievienot video">
        <AddVideoForm onAddVideo={onAddVideo} onClose={() => onClose('video')} availableAuthors={authors} />
      </Modal>
    </>
  );
};

export default AdminModals;
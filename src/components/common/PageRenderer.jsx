// src/components/common/PageRenderer.jsx
import React from 'react';

import HomePage from '../../pages/HomePage';
import CardsPage from '../../pages/CardsPage';
import ArticlesPage from '../../pages/ArticlesPage';
import VideosPage from '../../pages/VideosPage';
import AdminPage from '../../pages/AdminPage';

const PageRenderer = (props) => {
  const { activeSection, ...pageProps } = props;

  switch (activeSection) {
    case 'home':
      return <HomePage {...pageProps.home} />;
    
    case 'recommendations':
    case 'association':
    case 'trade':
    case 'stories':
    case 'prints':
      return <CardsPage {...pageProps.cards} />;

    case 'articles':
      return <ArticlesPage {...pageProps.articles} />;

    case 'videos':
      return <VideosPage {...pageProps.videos} />;

    case 'admin':
      return <AdminPage {...pageProps.admin} />;

    default:
      return <HomePage {...pageProps.home} />;
  }
};

export default PageRenderer;
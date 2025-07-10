// src/pages/ArticlesPage.jsx
import React from 'react';
import ArticleList from '../components/lists/ArticleList/ArticleList';
import Pagination from '../components/common/Pagination/Pagination';
import ThemeDetailDisplay from '../components/common/ThemeDetailDisplay/ThemeDetailDisplay';

/**
 * Rakstu lapas komponente.
 * Apvieno rakstu sarakstu un lapošanas kontroles.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.articles - Rakstu masīvs, kas jāattēlo (jau lapots no App.jsx).
 * @param {Array<object>} props.availableAuthors - Pieejamo autoru masīvs, kas tiek padots ArticleList.
 * @param {object} props.paginationProps - Objekts ar visiem lapošanas rekvizītiem (totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange, itemsPerPageOptions).
 * @param {object} props.pageThemeDetail - JAUNS: Tēmas objekts, kas satur šīs lapas tēmas detaļas.
 */
const ArticlesPage = ({ articles, availableAuthors, paginationProps, pageThemeDetail }) => {
  return (
    <>
      {/* JAUNS: Attēlo lapas tēmas detaļas, ja tās ir pieejamas */}
      {pageThemeDetail && <ThemeDetailDisplay theme={pageThemeDetail} />}

      {/* Attēlo rakstu sarakstu */}
      <ArticleList articles={articles} availableAuthors={availableAuthors} />
      
      {/* Attēlo lapošanas kontroles rakstiem */}
      <Pagination {...paginationProps} />
    </>
  );
};

export default ArticlesPage;
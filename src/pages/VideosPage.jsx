// src/pages/VideosPage.jsx
import React from 'react';
import VideoList from '../components/lists/VideoList/VideoList';
import Pagination from '../components/common/Pagination/Pagination';
import ThemeDetailDisplay from '../components/common/ThemeDetailDisplay/ThemeDetailDisplay'; // JAUNS: Importējam ThemeDetailDisplay

/**
 * Video lapas komponente.
 * Apvieno video sarakstu un lapošanas kontroles.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.videos - Video masīvs, kas jāattēlo (jau lapots no App.jsx).
 * @param {Array<object>} props.availableAuthors - Pieejamo autoru masīvs, kas tiek padots VideoList.
 * @param {object} props.paginationProps - Objekts ar visiem lapošanas rekvizītiem (totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange, itemsPerPageOptions).
 * @param {object} props.pageThemeDetail - JAUNS: Tēmas objekts, kas satur šīs lapas tēmas detaļas.
 */
const VideosPage = ({ videos, availableAuthors, paginationProps, pageThemeDetail }) => {
  return (
    <>
      {/* JAUNS: Attēlo lapas tēmas detaļas, ja tās ir pieejamas */}
      {pageThemeDetail && <ThemeDetailDisplay theme={pageThemeDetail} />}

      {/* Attēlo video sarakstu */}
      <VideoList videos={videos} availableAuthors={availableAuthors} />
      
      {/* Attēlo lapošanas kontroles video ierakstiem */}
      <Pagination {...paginationProps} />
    </>
  );
};

export default VideosPage;
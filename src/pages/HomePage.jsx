// src/pages/HomePage.jsx
import React from 'react'; // Importējam React
import CardList from '../components/cards/CardList/CardList'; // Importējam CardList komponenti
import Pagination from '../components/common/Pagination/Pagination'; // Importējam Pagination komponenti
import ThemeDetailDisplay from '../components/common/ThemeDetailDisplay/ThemeDetailDisplay'; // Importējam ThemeDetailDisplay komponenti

/**
 * Sākumlapas komponente.
 * Attēlo sākumlapas tēmas detaļas, kartīšu sarakstu un lapošanas kontroles.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.cards - Kartīšu masīvs, kas jāattēlo šajā lapā. Paredzēts, ka tās jau ir lapotas.
 * @param {function} props.onReadMore - Funkcija, kas tiek padota CardList, lai atvērtu kartītes detalizēto skatu.
 * @param {Array<object>} props.availableAuthors - Pieejamo autoru masīvs, kas tiek padots CardList.
 * @param {object} props.paginationProps - Objekts ar visiem lapošanas rekvizītiem (totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange, itemsPerPageOptions).
 * @param {object} props.homePageThemeDetail - Tēmas objekts, kas satur "Sākums" tēmas detaļas (nosaukumu, kopsavilkumu, aprakstu).
 */
const HomePage = ({
  cards,
  onReadMore,
  availableAuthors,
  paginationProps,
  homePageThemeDetail
}) => {
  return (
    <>
      {/* Attēlo "Sākums" tēmas detaļas, ja tās ir pieejamas */}
      {homePageThemeDetail && <ThemeDetailDisplay theme={homePageThemeDetail} />}

      {/* Attēlo sākumlapas kartītes */}
      <CardList
        cards={cards}
        onReadMore={onReadMore}
        availableAuthors={availableAuthors}
      />

      {/* Attēlo lapošanas kontroles sākumlapas kartītēm */}
      <Pagination {...paginationProps} />
    </>
  );
};

export default HomePage; // Eksportējam komponenti
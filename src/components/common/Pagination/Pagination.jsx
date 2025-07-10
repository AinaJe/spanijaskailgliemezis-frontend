// src/components/common/Pagination/Pagination.jsx
import React from 'react'; // Importējam React, jo izmantojam JSX
import './Pagination.css'; // Importējam šīs komponentes stilus

/**
 * Lapošanas (Pagination) komponente.
 * Nodrošina navigāciju starp lapām un ierakstu skaita izvēli.
 * @param {object} props - Komponentes props.
 * @param {number} props.totalItems - Kopējais ierakstu skaits.
 * @param {number} props.itemsPerPage - Ierakstu skaits vienā lapā.
 * @param {number} props.currentPage - Pašreizējā lapa.
 * @param {function} props.onPageChange - Funkcija, kas tiek izsaukta, mainot lapu.
 * @param {function} props.onItemsPerPageChange - Funkcija, kas tiek izsaukta, mainot ierakstu skaitu lapā.
 * @param {Array<number>} props.itemsPerPageOptions - Masīvs ar pieejamajām ierakstu skaita izvēles opcijām (piem., [10, 20, 50, Infinity]).
 */
const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange, itemsPerPageOptions }) => {
  // Aprēķina kopējo lapu skaitu. Ja itemsPerPage ir Infinity, tad ir tikai 1 lapa.
  const totalPages = itemsPerPage === Infinity ? 1 : Math.ceil(totalItems / itemsPerPage);

  // Nosaka, vai rādīt lapošanas pogas (rādām tikai, ja ir vairāk par 1 lapu un nav "Visus" režīms)
  const showPageButtons = totalPages > 1 && itemsPerPage !== Infinity;

  // Izveido lapu numuru masīvu
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Lapošanas pogu diapazona aprēķins (lai nerādītu pārāk daudz pogu)
  const maxButtons = 5; // Maksimālais lapu pogu skaits, ko rādīt
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2)); // Sākuma lapa
  let endPage = Math.min(totalPages, startPage + maxButtons - 1); // Beigu lapa

  // Ja pēdējā lapa ir pārāk tuvu, pielāgo sākuma lapu, lai saglabātu maxButtons
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  // Izgūst attēlojamās lapu pogas
  const displayedPageNumbers = pageNumbers.slice(startPage - 1, endPage);

  return (
    <nav className="pagination-container" aria-label="Laposana">
      {/* Ierakstu skaits lapā selektors */}
      <div className="items-per-page-selector">
        <label htmlFor="items-per-page">Rādīt ierakstus:</label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value)); // Atjaunina ierakstu skaitu
            onPageChange(1); // Atgriežas uz 1. lapu, mainot ierakstu skaitu
          }}
          className="items-per-page-select"
          aria-label="Izvēlēties ierakstu skaitu lapā"
        >
          {itemsPerPageOptions.map(option => (
            <option key={option} value={option}>
              {option === Infinity ? 'Visus' : option} {/* Ja ir Infinity, rāda "Visus" */}
            </option>
          ))}
        </select>
      </div>

      {/* Lapošanas pogas, rāda tikai, ja showPageButtons ir true */}
      {showPageButtons && (
        <ul className="pagination-list">
          {/* Poga uz pirmo lapu */}
          <li className="pagination-item">
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1} // Atspējota, ja ir 1. lapa
              className="pagination-button"
              aria-label="Pirmā lapa"
            >
              «
            </button>
          </li>
          {/* Poga uz iepriekšējo lapu */}
          <li className="pagination-item">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1} // Atspējota, ja ir 1. lapa
              className="pagination-button"
              aria-label="Iepriekšējā lapa"
            >
              ‹
            </button>
          </li>
          {/* Elipses, ja sākuma lapa nav 1 */}
          {startPage > 1 && (
              <li className="pagination-item">
                  <span className="pagination-ellipsis">...</span>
              </li>
          )}
          {/* Attēlojamās lapu pogas */}
          {displayedPageNumbers.map(number => (
            <li key={number} className="pagination-item">
              <button
                onClick={() => onPageChange(number)}
                className={`pagination-button ${currentPage === number ? 'active' : ''}`} // Aktīvās pogas stils
                aria-current={currentPage === number ? 'page' : undefined} // ARIA atribūts aktīvajai lapai
                aria-label={`Lapa ${number}`}
              >
                {number}
              </button>
            </li>
          ))}
          {/* Elipses, ja beigu lapa nav pēdējā */}
          {endPage < totalPages && (
              <li className="pagination-item">
                  <span className="pagination-ellipsis">...</span>
              </li>
          )}
          {/* Poga uz nākamo lapu */}
          <li className="pagination-item">
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages} // Atspējota, ja ir pēdējā lapa
              className="pagination-button"
              aria-label="Nākamā lapa"
            >
              ›
            </button>
          </li>
          {/* Poga uz pēdējo lapu */}
          <li className="pagination-item">
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages} // Atspējota, ja ir pēdējā lapa
              className="pagination-button"
              aria-label="Pēdējā lapa"
            >
              »
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Pagination; // Eksportējam komponenti
// src/utils/dateUtils.js

/**
 * Formatē ISO datuma/laika virkni DD.MM.YYYY HH:MM formātā.
 * @param {string} isoDateTimeString - ISO 8601 formāta datuma/laika virkne.
 * @returns {string} Formatēta datuma/laika virkne vai 'N/A', ja nederīga.
 */
export const formatDateTimeToDDMMYYYYHHMM = (isoDateTimeString) => {
  if (!isoDateTimeString) return 'N/A';
  const date = new Date(isoDateTimeString);
  // Pārbauda, vai datums ir derīgs
  if (isNaN(date.getTime())) return 'N/A';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mēneši ir no 0-11
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

/**
 * Formatē ISO datuma virkni DD.MM.YYYY formātā.
 * @param {string} isoDateString - ISO 8601 formāta datuma virkne.
 * @returns {string} Formatēta datuma virkne vai 'N/A', ja nederīga.
 */
export const formatDateToDDMMYYYY = (isoDateString) => {
    if (!isoDateString) return 'N/A';
    const date = new Date(isoDateString);
    // Pārbauda, vai datums ir derīgs
    if (isNaN(date.getTime())) return 'N/A';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
// src/hooks/useFilters.js
import { useState, useCallback, useMemo } from 'react';

export const useFilters = (initialTheme = 1) => {
  const [filterTheme, setFilterTheme] = useState(initialTheme);
  const [filterAuthors, setFilterAuthors] = useState([]);
  const [selectedFilteredCardIds, setSelectedFilteredCardIds] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleToggleCardSelectionInFilter = useCallback((cardId) => {
    setSelectedFilteredCardIds(prevSelected =>
      prevSelected.includes(cardId)
        ? prevSelected.filter(id => id !== cardId)
        : [...prevSelected, cardId]
    );
  }, []);

  const handleClearCardSelections = useCallback(() => {
    setSelectedFilteredCardIds([]);
  }, []);

  const handleRemoveFilter = useCallback((filter, setActiveTheme) => {
    if (filter.type === 'theme') {
      setFilterTheme('all');
      if (setActiveTheme) setActiveTheme('all');
    } else if (filter.type === 'author') {
      setFilterAuthors(prev => prev.filter(id => id !== filter.id));
    } else if (filter.type === 'selectedCards') {
      setSelectedFilteredCardIds([]);
    }
  }, []);

  const handleClearAllActiveFilters = useCallback((setActiveTheme) => {
    setFilterTheme('all');
    setFilterAuthors([]);
    setSelectedFilteredCardIds([]);
    if (setActiveTheme) setActiveTheme('all');
  }, []);

  const resetFilters = useCallback((theme) => {
    setFilterTheme(theme);
    setFilterAuthors([]);
    setSelectedFilteredCardIds([]);
  }, []);

  const activeFiltersList = useMemo(() => (themesData, authors, activeSection) => {
    const filters = [];
    const safeThemes = Array.isArray(themesData) ? themesData : [];
    const safeAuthors = Array.isArray(authors) ? authors : [];

    if (activeSection === 'recommendations') {
      if (filterTheme !== 'all') {
        const themeName = safeThemes.find(t => t.id === filterTheme)?.name || filterTheme;
        filters.push({ type: 'theme', value: themeName, id: filterTheme });
      }
      filterAuthors.forEach(authorId => {
          const authorName = safeAuthors.find(a => a.id === authorId)?.name || authorId;
          filters.push({ type: 'author', value: authorName, id: authorId });
      });
      if (selectedFilteredCardIds.length > 0) {
          filters.push({ type: 'selectedCards', value: `${selectedFilteredCardIds.length} kartītes`, id: 'selectedCards' });
      }
    }
    return filters;
  }, [filterTheme, filterAuthors, selectedFilteredCardIds]);

  return {
    filterTheme,
    setFilterTheme,
    filterAuthors,
    setFilterAuthors,
    selectedFilteredCardIds,
    isFilterModalOpen,
    setIsFilterModalOpen,
    handleToggleCardSelectionInFilter,
    handleClearCardSelections,
    handleRemoveFilter,
    handleClearAllActiveFilters,
    activeFiltersList,
    resetFilters,
  };
};
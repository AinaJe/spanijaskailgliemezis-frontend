// src/components/common/AdminSection.jsx
import React from 'react';
import Accordion from './Accordion/Accordion';
import Pagination from './Pagination/Pagination';

const AdminSection = ({
  title,
  isOpen,
  onToggle,
  data,
  columns,
  renderRow,
  paginationProps,
  itemsPerPageOptions,
  children, // Pievienojam 'children' prop
}) => {
  return (
    <Accordion
      title={title}
      isOpen={isOpen}
      onToggle={onToggle}
      content={
        <>
          {children} {/* Attēlojam bērnu elementus (filtrus) */}
          {data.length === 0 ? (
            <p>Nav neviena ieraksta.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <colgroup>
                  {columns.map((col, index) => (
                    <col key={index} style={{ width: col.width }} />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    {columns.map((col, index) => (
                      <th key={index} data-label={col.label}>{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => renderRow(item))}
                </tbody>
              </table>
            </div>
          )}
          {paginationProps && (
            <Pagination
              totalItems={paginationProps.totalItems}
              itemsPerPage={paginationProps.itemsPerPage}
              currentPage={paginationProps.currentPage}
              onPageChange={paginationProps.onPageChange}
              onItemsPerPageChange={paginationProps.onItemsPerPageChange}
              itemsPerPageOptions={itemsPerPageOptions}
            />
          )}
        </>
      }
    />
  );
};

export default AdminSection;
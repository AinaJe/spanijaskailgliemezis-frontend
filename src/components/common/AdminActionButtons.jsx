// src/components/common/AdminActionButtons.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AdminActionButtons = ({ onShow }) => {
  return (
    <div className="admin-action-buttons">
      <button className="admin-action-button" onClick={() => onShow('author')}>
        <FontAwesomeIcon icon={faPlus} /> Pievienot autoru
      </button>
      <button className="admin-action-button" onClick={() => onShow('theme')}>
        <FontAwesomeIcon icon={faPlus} /> Pievienot tēmu
      </button>
      <button className="admin-action-button" onClick={() => onShow('card')}>
        <FontAwesomeIcon icon={faPlus} /> Pievienot kartīti
      </button>
      <button className="admin-action-button" onClick={() => onShow('article')}>
        <FontAwesomeIcon icon={faPlus} /> Pievienot rakstu
      </button>
      <button className="admin-action-button" onClick={() => onShow('video')}>
        <FontAwesomeIcon icon={faPlus} /> Pievienot video
      </button>
    </div>
  );
};

export default AdminActionButtons;
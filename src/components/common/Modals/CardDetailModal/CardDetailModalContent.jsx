// src/components/common/Modals/CardDetailModalContent.jsx
import React, { lazy, Suspense } from "react";
import "./CardDetailModal.css";

// LABOJUMS: Pareizi ceļi uz citām komponentēm
const ImageCarousel = lazy(() =>
  import("../../../cards/ImageCarousel/ImageCarousel")
);
import RichTextEditor from "../../RichTextEditor/RichTextEditor";

const CardDetailModalContent = ({ card }) => {
  if (!card) return null;

  return (
    <>
      <h2>{card.title}</h2>
      <p className="card-detail-modal-theme">
        <strong>Tēma:</strong> {card.themeName || card.theme}
      </p>
      <p className="card-detail-modal-author">
        <strong>Autors:</strong> {card.authorName}
      </p>
      {card.summary && (
        <p className="card-detail-modal-summary">{card.summary}</p>
      )}

      {card.images && card.images.length > 0 && (
        <Suspense fallback={<div>Ielādē attēlus...</div>}>
          <ImageCarousel
            images={card.images}
            availableAuthors={card.allAuthors}
            onImageClick={() => {}}
          />
        </Suspense>
      )}

      <div className="card-detail-content-section">
        <h3>Apraksts:</h3>
        <RichTextEditor content={card.description} onContentChange={null} />
      </div>
    </>
  );
};

export default CardDetailModalContent;

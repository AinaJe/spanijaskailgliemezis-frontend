// src/components/lists/VideoList/VideoList.jsx
import React from 'react'; // Importējam React
import '../ArticleList/ArticleList.css'; // Importējam kopējos tabulu stilus no ArticleList
import RichTextEditor from '../../common/RichTextEditor/RichTextEditor'; // Importējam RichTextEditor, jo video ir apraksts

/**
 * Video saraksta komponente.
 * Attēlo video sarakstu tabulas veidā.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.videos - Video masīvs, kas jāattēlo. Katram video jābūt { id, date, title, summary, videoLink, description, authorId }.
 * @param {Array<object>} props.availableAuthors - Pieejamo autoru masīvs ({ id, name }), lai atrastu autora vārdu.
 */
const VideoList = ({ videos, availableAuthors }) => {
  // Ja nav neviena video ieraksta vai masīvs ir tukšs, attēlojam ziņojumu
  if (!videos || videos.length === 0) {
    return <p className="empty-list-message">Nav neviena video ieraksta.</p>;
  }

  return (
    <div className="video-list-container">
      <table className="video-table">
        <thead>
          <tr>
            <th>Datums</th>
            <th>Nosaukums</th>
            <th>Kopsavilkums</th>
            <th>Autors</th>
            <th>Darbības</th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video => {
            // Atrodam autora vārdu, pamatojoties uz authorId
            const author = availableAuthors.find(a => a.id === video.authorId);
            const authorName = author ? author.name : 'Nezināms autors';
            return (
              <tr key={video.id}>
                <td data-label="Datums">{video.date}</td>
                <td data-label="Nosaukums">{video.title}</td>
                <td data-label="Kopsavilkums">
                    {video.summary || 'Nav kopsavilkuma'}
                    {/* Attēlo video aprakstu, ja tas ir pieejams, izmantojot RichTextEditor skatīšanās režīmā */}
                    {video.description && (
                        <div className="video-description-text">
                            <RichTextEditor content={video.description} onContentChange={null} />
                        </div>
                    )}
                </td>
                <td data-label="Autors">{authorName}</td>
                <td data-label="Darbības">
                  {/* Ja video ir saite, attēlojam pogu "Skatīties video" */}
                  {video.videoLink ? (
                    <a
                      href={video.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-button view-button"
                    >
                      Skatīties video
                    </a>
                  ) : (
                    // Ja saites nav, attēlojam ziņojumu
                    <span className="no-link-message">Nav saites</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VideoList; // Eksportējam komponenti
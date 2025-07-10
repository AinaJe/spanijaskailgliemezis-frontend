// src/components/lists/ArticleList/ArticleList.jsx
import React from 'react'; // Importējam React
import './ArticleList.css'; // Importējam šīs komponentes stilus (tiek izmantots arī VideoList)

/**
 * Rakstu saraksta komponente.
 * Attēlo rakstu sarakstu tabulas veidā.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.articles - Rakstu masīvs, kas jāattēlo. Katram rakstam jābūt { id, date, title, summary, link, authorId }.
 * @param {Array<object>} props.availableAuthors - Pieejamo autoru masīvs ({ id, name }), lai atrastu autora vārdu.
 */
const ArticleList = ({ articles, availableAuthors }) => {
  // Ja nav neviena raksta vai masīvs ir tukšs, attēlojam ziņojumu
  if (!articles || articles.length === 0) {
    return <p className="empty-list-message">Nav neviena raksta.</p>;
  }

  return (
    <div className="article-list-container">
      <table className="article-table">
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
          {articles.map(article => {
            // Atrodam autora vārdu, pamatojoties uz authorId
            const author = availableAuthors.find(a => a.id === article.authorId);
            const authorName = author ? author.name : 'Nezināms autors';

            return (
              <tr key={article.id}>
                <td data-label="Datums">{article.date}</td>
                <td data-label="Nosaukums">{article.title}</td>
                <td data-label="Kopsavilkums">{article.summary || 'Nav kopsavilkuma'}</td>
                <td data-label="Autors">{authorName}</td>
                <td data-label="Darbības">
                  {/* Ja rakstam ir saite, attēlojam pogu "Lasīt rakstu" */}
                  {article.link ? (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-button view-button"
                    >
                      Lasīt rakstu
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

export default ArticleList; // Eksportējam komponenti
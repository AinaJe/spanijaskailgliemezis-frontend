// src/components/forms/AddArticleForm.jsx
import React, { useState } from 'react'; // Importējam React un useState hooku
// RichTextEditor šajā formā netiek izmantots, jo rakstam ir tikai saite, nevis apraksts.
// Ja nākotnē mainītos specifikācija un rakstam vajadzētu bagātināto aprakstu, tad to vajadzētu importēt.
import './AddForm.css'; // Importējam kopējos formu stilus

/**
 * Raksta pievienošanas forma.
 * Nodrošina formu jauna raksta datuma, nosaukuma, kopsavilkuma, saites un autora ievadei.
 * Atļauj izvēlēties esošu autoru vai pievienot jaunu.
 * @param {object} props - Komponentes props.
 * @param {function} props.onAddArticle - Funkcija, kas tiek izsaukta, kad raksts tiek pievienots.
 * @param {function} props.onClose - Funkcija, kas tiek izsaukta, lai aizvērtu formu (piem., modālo logu).
 * @param {Array<object>} props.availableAuthors - Masīvs ar pieejamajiem autoru objektiem ({ id, name }).
 */
const AddArticleForm = ({ onAddArticle, onClose, availableAuthors }) => {
  // Stāvokļi formas laukiem
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [link, setLink] = useState('');
  // Autora izvēles stāvokļi: authorInput saturēs izvēlētā autora ID vai jauna autora vārdu
  const [authorInput, setAuthorInput] = useState('');
  const [isNewAuthorSelected, setIsNewAuthorSelected] = useState(false);

  /**
   * Validē ievadīto datumu.
   * @param {string} inputDate - Ievadītais datums YYYY-MM-DD formātā.
   * @returns {string} Kļūdas ziņojums, ja datums ir nederīgs, citādi tukša virkne.
   */
  const validateDate = (inputDate) => {
    const minDate = new Date('1950-01-01'); // Minimālais atļautais datums
    const today = new Date(); // Šodienas datums
    const selectedDate = new Date(inputDate); // Pārvērš ievadīto datumu par Date objektu

    // Pārbauda, vai datums ir derīgā formātā
    if (isNaN(selectedDate.getTime())) {
      return 'Nederīgs datuma formāts.';
    }
    // Pārbauda, vai datums nav senāks par 1950. gadu
    if (selectedDate < minDate) {
      return 'Datums nevar būt senāks par 1950. gadu.';
    }
    // Pārbauda, vai datums nav nākotnē
    if (selectedDate > today) {
      return 'Datums nevar būt nākotnē.';
    }
    return ''; // Ja nav kļūdu, atgriež tukšu virkni
  };

  /**
   * Apstrādā autora izvēles lauka izmaiņas (esošs autors vai jauns autors).
   * @param {object} e - Izmaiņu notikuma objekts.
   */
  const handleAuthorSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'new-author-option') {
      setIsNewAuthorSelected(true); // Ieslēdzam jauna autora ievades lauku
      setAuthorInput(''); // Notīrām authorInput, lai lietotājs varētu ievadīt jaunu vārdu
    } else {
      setIsNewAuthorSelected(false); // Izslēdzam jauna autora ievades lauku
      setAuthorInput(selectedValue); // Iestatām izvēlētā esošā autora ID
    }
  };

  /**
   * Funkcija, kas tiek izsaukta, iesniedzot formu.
   * @param {object} e - Iesniegšanas notikuma objekts.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Novērš noklusējuma formas iesniegšanas uzvedību

    // Validē datumu
    const dateError = validateDate(date);
    if (dateError) {
      alert(dateError);
      return;
    }

    let finalAuthorIdToSend = '';
    if (isNewAuthorSelected) {
        // Ja izvēlēts jauns autors, pārbaudām, vai vārds nav tukšs
        if (!authorInput.trim()) {
            alert('Jauna autora vārds ir obligāts!');
            return;
        }
        // Konstruējam pagaidu ID jaunajam autoram (piemēram, "new-author-Vards Uzvards")
        finalAuthorIdToSend = `new-author-${authorInput.trim()}`;
    } else {
        // Ja izvēlēts esošs autors, pārbaudām, vai autors ir izvēlēts
        if (!authorInput) {
            alert('Autors ir obligāts!');
            return;
        }
        finalAuthorIdToSend = authorInput; // Izmantojam esošā autora ID
    }

    // Validācija obligātajiem laukiem
    if (!title.trim() || !finalAuthorIdToSend) {
      alert('Nosaukums un autors ir obligāti!');
      return;
    }

    // Izsaucam onAddArticle funkciju ar jaunā raksta datiem
    onAddArticle({
      date: date.trim(),
      title: title.trim(),
      summary: summary.trim(),
      link: link.trim(),
      authorId: finalAuthorIdToSend, // Nosūtām autora ID vai jauna autora pagaidu ID
    });

    // Notīrām formas laukus pēc iesniegšanas
    setDate('');
    setTitle('');
    setSummary('');
    setLink('');
    setAuthorInput('');
    setIsNewAuthorSelected(false);
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      {/* Datuma ievades lauks */}
      <div className="form-group">
        <label htmlFor="articleDate">Datums (YYYY-MM-DD):</label>
        <input
          type="date"
          id="articleDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
          min="1950-01-01" // Minimālais atļautais datums
          max={new Date().toISOString().split('T')[0]} // Maksimālais datums ir šodiena
        />
      </div>
      {/* Nosaukuma ievades lauks */}
      <div className="form-group">
        <label htmlFor="articleTitle">Nosaukums:</label>
        <input
          type="text"
          id="articleTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ievadiet raksta nosaukumu"
          className="form-control"
        />
      </div>
      {/* Kopsavilkuma ievades lauks (nav obligāts) */}
      <div className="form-group">
        <label htmlFor="articleSummary">Kopsavilkums (nav obligāts):</label>
        <textarea
          id="articleSummary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows="2"
          placeholder="Īss raksta kopsavilkums"
          className="form-control"
        ></textarea>
      </div>
      {/* Saites ievades lauks (nav obligāts) */}
      <div className="form-group">
        <label htmlFor="articleLink">Saite (nav obligāts):</label>
        <input
          type="url"
          id="articleLink"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://example.com/raksts"
          className="form-control"
        />
      </div>
      {/* Autora izvēles lauks */}
      <div className="form-group">
        <label htmlFor="articleAuthor">Autors:</label>
        <select
          id="articleAuthor"
          value={isNewAuthorSelected ? 'new-author-option' : authorInput} // Vērtība atkarīga no tā, vai izvēlēts jauns autors
          onChange={handleAuthorSelectChange}
          className="form-control"
        >
          <option value="">-- Izvēlēties autoru --</option>
          {/* Attēlo pieejamos autorus */}
          {availableAuthors.map((author) => (
            <option key={author.id} value={author.id}>{author.name}</option>
          ))}
          <option value="new-author-option">Jauns autors...</option>
        </select>
        {/* Lauks jauna autora vārda ievadei, ja izvēlēts "Jauns autors..." */}
        {isNewAuthorSelected && (
          <input
            type="text"
            id="newAuthorName"
            value={authorInput} // authorInput tagad satur jauna autora vārdu
            onChange={(e) => setAuthorInput(e.target.value)}
            placeholder="Ievadiet jauna autora vārdu"
            className="form-control"
            style={{ marginTop: '10px' }}
          />
        )}
      </div>
      <div className="form-actions">
        {/* Iesniegšanas poga */}
        <button type="submit" className="submit-button">Pievienot</button>
        {/* Atcelšanas poga, kas aizver formu */}
        <button type="button" onClick={onClose} className="cancel-button">Atcelt</button>
      </div>
    </form>
  );
};

export default AddArticleForm; // Eksportējam komponenti
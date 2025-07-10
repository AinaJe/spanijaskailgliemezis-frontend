// src/components/forms/AddVideoForm.jsx
import React, { useState } from 'react'; // Importējam React un useState hooku
import RichTextEditor from '../common/RichTextEditor/RichTextEditor'; // Importējam RichTextEditor, jo video ir apraksts
import './AddForm.css'; // Importējam kopējos formu stilus

/**
 * Video pievienošanas forma.
 * Nodrošina formu jauna video datuma, nosaukuma, kopsavilkuma, saites/faila augšupielādes, apraksta un autora ievadei.
 * Atļauj izvēlēties esošu autoru vai pievienot jaunu.
 * @param {object} props - Komponentes props.
 * @param {function} props.onAddVideo - Funkcija, kas tiek izsaukta, kad video tiek pievienots.
 * @param {function} props.onClose - Funkcija, kas tiek izsaukta, lai aizvērtu formu (piem., modālo logu).
 * @param {Array<object>} props.availableAuthors - Masīvs ar pieejamajiem autoru objektiem ({ id, name }).
 */
const AddVideoForm = ({ onAddVideo, onClose, availableAuthors }) => {
  // Stāvokļi formas laukiem
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [videoLink, setVideoLink] = useState(''); // Video URL
  const [videoFile, setVideoFile] = useState(null); // Video fails augšupielādei
  const [sourceType, setSourceType] = useState('url'); // Video avota tips: 'url' vai 'upload'
  const [description, setDescription] = useState(''); // Bagātinātais apraksts no RichTextEditor

  // Autora izvēles stāvokļi
  const [authorInput, setAuthorInput] = useState(''); // Satur izvēlētā autora ID vai jauna autora vārdu
  const [isNewAuthorSelected, setIsNewAuthorSelected] = useState(false); // Vai izvēlēts jauns autors

  /**
   * Validē ievadīto datumu.
   * @param {string} inputDate - Ievadītais datums YYYY-MM-DD formātā.
   * @returns {string} Kļūdas ziņojums, ja datums ir nederīgs, citādi tukša virkne.
   */
  const validateDate = (inputDate) => {
    const minDate = new Date('1950-01-01');
    const today = new Date();
    const selectedDate = new Date(inputDate);

    if (isNaN(selectedDate.getTime())) {
      return 'Nederīgs datuma formāts.';
    }
    if (selectedDate < minDate) {
      return 'Datums nevar būt senāks par 1950. gadu.';
    }
    if (selectedDate > today) {
      return 'Datums nevar būt nākotnē.';
    }
    return '';
  };

  /**
   * Apstrādā autora izvēles lauka izmaiņas (esošs autors vai jauns autors).
   * @param {object} e - Izmaiņu notikuma objekts.
   */
  const handleAuthorSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'new-author-option') {
      setIsNewAuthorSelected(true);
      setAuthorInput('');
    } else {
      setIsNewAuthorSelected(false);
      setAuthorInput(selectedValue);
    }
  };

  /**
   * Apstrādā video avota tipa izmaiņas (URL vai augšupielāde).
   * Notīra atbilstošos laukus, lai izvairītos no kļūdām.
   * @param {string} type - Jaunais avota tips ('url' vai 'upload').
   */
  const handleSourceTypeChange = (type) => {
    setSourceType(type);
    setVideoLink(''); // Notīra URL, ja maina uz augšupielādi
    setVideoFile(null); // Notīra failu, ja maina uz URL
  };

  /**
   * Apstrādā video faila izmaiņas (ja izvēlēta augšupielāde).
   * @param {object} e - Izmaiņu notikuma objekts.
   */
  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]); // Iegūst izvēlēto failu
    setVideoLink(''); // Notīra URL, ja tiek augšupielādēts fails
  };

  /**
   * Funkcija, kas tiek izsaukta, iesniedzot formu.
   * @param {object} e - Iesniegšanas notikuma objekts.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Novērš noklusējuma formas iesniegšanas uzvedību

    // Validē datumu
    const dateError = validateDate(date);
    if (dateError) {
      alert(dateError);
      return;
    }

    // Apstrādā autora ID vai jauna autora vārdu
    let finalAuthorIdToSend = '';
    if (isNewAuthorSelected) {
        if (!authorInput.trim()) {
            alert('Jauna autora vārds ir obligāts!');
            return;
        }
        finalAuthorIdToSend = `new-author-${authorInput.trim()}`; // Pagaidu ID jaunajam autoram
    } else {
        if (!authorInput) {
            alert('Autors ir obligāts!');
            return;
        }
        finalAuthorIdToSend = authorInput; // Esošā autora ID
    }

    // Apstrādā video avotu (URL vai fails)
    let finalVideoSource = '';
    let isVideoSourceProvided = false;
    if (sourceType === 'url') {
      if (!videoLink.trim()) {
        alert('Video saite ir obligāta, ja izvēlēts URL tips!');
        return;
      }
      finalVideoSource = videoLink.trim();
      isVideoSourceProvided = true;
    } else { // sourceType === 'upload'
      if (!videoFile) {
        alert('Video fails ir obligāts, ja izvēlēts augšupielādes tips!');
        return;
      }
      // Simulē faila augšupielādi. Reālā aplikācijā šeit būtu API izsaukums faila augšupielādei.
      console.log(`Simulē faila augšupielādi: ${videoFile.name}`);
      finalVideoSource = `https://simulated-server.com/uploads/videos/${videoFile.name}`; // Pagaidu URL
      isVideoSourceProvided = true;
    }

    // Validācija obligātajiem laukiem
    // Pārbauda, vai nosaukums, autors un video avots (saite/fails) ir aizpildīti
    if (!title.trim() || !finalAuthorIdToSend || !isVideoSourceProvided) {
      alert('Nosaukums, autors un video avots ir obligāti!');
      return;
    }
    // Pārbauda, vai apraksts nav tukšs (ja tas nav obligāts, tad šo var noņemt vai pielāgot)
    // Jūsu oriģinālajā kodā apraksts nebija obligāts, bet, ja RichTextEditor ir pievienots, bieži vien saturs ir vajadzīgs
    if (description.trim() === '' || description.trim() === '<p></p>') {
      alert('Apraksts ir obligāts!');
      return;
    }


    // Izsaucam onAddVideo funkciju ar jaunā video datiem
    onAddVideo({
      date: date.trim(),
      title: title.trim(),
      summary: summary.trim(),
      videoLink: finalVideoSource, // Nosūtām galīgo video avotu
      description: description.trim(),
      authorId: finalAuthorIdToSend,
      sourceType: sourceType, // Nosūtām arī avota tipu, ja tas ir nepieciešams backendam
    });

    // Notīrām formas laukus pēc iesniegšanas
    setDate('');
    setTitle('');
    setSummary('');
    setVideoLink('');
    setVideoFile(null);
    setSourceType('url'); // Atjaunojam noklusējuma avota tipu
    setDescription('');
    setAuthorInput('');
    setIsNewAuthorSelected(false);
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      {/* Datuma ievades lauks */}
      <div className="form-group">
        <label htmlFor="videoDate">Datums (YYYY-MM-DD):</label>
        <input
          type="date"
          id="videoDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
          min="1950-01-01"
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
      {/* Nosaukuma ievades lauks */}
      <div className="form-group">
        <label htmlFor="videoTitle">Nosaukums:</label>
        <input
          type="text"
          id="videoTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ievadiet video nosaukumu"
          className="form-control"
        />
      </div>
      {/* Kopsavilkuma ievades lauks (nav obligāts) */}
      <div className="form-group">
        <label htmlFor="videoSummary">Kopsavilkums (nav obligāts):</label>
        <textarea
          id="videoSummary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows="2"
          placeholder="Īss video kopsavilkums"
          className="form-control"
        ></textarea>
      </div>

      {/* Video avota izvēle (radio pogas) */}
      <div className="form-group">
        <label>Video avots:</label>
        <div className="source-type-selector" style={{display: 'flex', gap: '15px', marginTop: '5px'}}>
          <label>
            <input
              type="radio"
              value="url"
              checked={sourceType === 'url'}
              onChange={() => handleSourceTypeChange('url')}
            />
            Video URL
          </label>
          <label>
            <input
              type="radio"
              value="upload"
              checked={sourceType === 'upload'}
              onChange={() => handleSourceTypeChange('upload')}
            />
            Augšupielādēt failu
          </label>
        </div>
      </div>

      {/* Dinamiski parādās vai nu URL ievades lauks, vai faila augšupielādes lauks */}
      {sourceType === 'url' ? (
        <div className="form-group">
          <label htmlFor="videoLink">Video saite:</label>
          <input
            type="url"
            id="videoLink"
            // value={videoLink} Savādāk kļūda.
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
            className="form-control"
          />
        </div>
      ) : (
        <div className="form-group">
          <label htmlFor="videoFile">Video fails:</label>
          <input
            type="file"
            id="videoFile"
            onChange={handleVideoFileChange}
            className="form-control"
            accept="video/*" // Atļauj tikai video failus
            // Nepievienojam value atribūtu 'file' tipa inputam drošības apsvērumu dēļ un lai tas atļautu atkārtoti izvēlēties to pašu failu
          />
        </div>
      )}

      {/* Apraksta lauks, izmantojot RichTextEditor */}
      <div className="form-group">
        <label htmlFor="videoDescription">Apraksts:</label>
        <RichTextEditor content={description} onContentChange={setDescription} />
      </div>
      {/* Autora izvēles lauks */}
      <div className="form-group">
        <label htmlFor="videoAuthor">Autors:</label>
        <select
          id="videoAuthor"
          value={isNewAuthorSelected ? 'new-author-option' : authorInput}
          onChange={handleAuthorSelectChange}
          className="form-control"
        >
          <option value="">-- Izvēlēties autoru --</option>
          {availableAuthors.map((author) => (
            <option key={author.id} value={author.id}>{author.name}</option>
          ))}
          <option value="new-author-option">Jauns autors...</option>
        </select>
        {/* Lauks jauna autora vārda ievadei */}
        {isNewAuthorSelected && (
          <input
            type="text"
            id="newAuthorName"
            value={authorInput}
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
        {/* Atcelšanas poga */}
        <button type="button" onClick={onClose} className="cancel-button">Atcelt</button>
      </div>
    </form>
  );
};

export default AddVideoForm; // Eksportējam komponenti
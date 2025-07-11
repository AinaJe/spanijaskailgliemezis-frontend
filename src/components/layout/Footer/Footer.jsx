// src/components/layout/Footer/Footer.jsx
import React from 'react'; // Importējam React
import './Footer.css'; // Importējam šīs komponentes stilus
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importējam FontAwesome ikonu komponenti
// Importējam visas nepieciešamās sociālo tīklu ikonas
import { faFacebook, faFacebookSquare, faYoutube, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons';

/**
 * Kājenes (Footer) komponente.
 * Attēlo vietnes kājenes informāciju, tostarp autortiesības, sociālo tīklu saites un noderīgas saites.
 */
const Footer = () => {
    const currentYear = new Date().getFullYear(); // Iegūst pašreizējo gadu
    const startYear = 2022; // Jūsu projekta brīvprātīgās kustības sākuma gads
    const startYearBiedriba = 2025; // Jūsu biedrības dibināšanas gads

    return (
        <footer className="app-footer">
            <div className="footer-content-wrapper">
                {/* Autortiesību sadaļa */}
                <div className="footer-section copyright">
                    <div><p>© Brīvprātīgā kustība pret Spānijas kailgliemezi {startYear}-{currentYear}</p></div>
                    <div><p>© Biedrība "Pret Spānijas kailgliemezi" {startYearBiedriba}-{currentYear}</p></div>
                    <div><p>© Mājaslapas izveide: Aina Jēkabsone</p></div>
                </div>

                {/* Sociālo tīklu saites sadaļa */}
                <div className="footer-section social-links">
                    <h4>Seko mums:</h4>
                    <div className="social-icons">
                        {/* Facebook lapas ikona */}
                        <a href="https://www.facebook.com/jusu.lapas.adrese" target="_blank" rel="noopener noreferrer" aria-label="Facebook lapa" className="social-icon-link" title="Facebook lapa">
                            <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                        {/* Facebook grupas ikona */}
                        <a href="https://www.facebook.com/groups/jusu.grupas.adrese" target="_blank" rel="noopener noreferrer" aria-label="Facebook grupa" className="social-icon-link" title="Facebook grupa">
                            <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
                        </a>
                        {/* Youtube ikona */}
                        <a href="https://www.youtube.com/watch?v=VIDEO_ID" target="_blank" rel="noopener noreferrer" aria-label="YouTube kanāls" className="social-icon-link" title="YouTube kanāls">
                            <FontAwesomeIcon icon={faYoutube} size="2x" />
                        </a>
                        {/* TikTok ikona */}
                        <a href="https://www.tiktok.com/@jusu.tiktok.adrese" target="_blank" rel="noopener noreferrer" aria-label="TikTok profils" className="social-icon-link" title="TikTok profils">
                            <FontAwesomeIcon icon={faTiktok} size="2x" />
                        </a>
                        {/* X (Twitter) ikona */}
                        <a href="https://x.com/jusu.x.adrese" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) profils" className="social-icon-link" title="X (Twitter) profils">
                            <FontAwesomeIcon icon={faXTwitter} size="2x" />
                        </a>
                    </div>
                </div>

                {/* Noderīgu ārējo saišu sadaļa */}
                <div className="footer-section external-links">
                    <h4>Noderīgas saites:</h4>
                    <ul>
                        <li>
                            <a href="https://jusu-iepriekseja-lapas-versija.com" target="_blank" rel="noopener noreferrer">
                                Iepriekšējā lapas versija
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer; // Eksportējam komponenti
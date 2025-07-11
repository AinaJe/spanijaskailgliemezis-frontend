// src/components/layout/Header/Header.jsx
import React, { useState } from 'react';
import AdminLoginModal from '../../common/Modals/AdminLoginModal'; // Precīzs imports
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header = ({ themes, activeTheme, onThemeSelect, activeSection, onSectionSelect }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopCardsDropdownOpen, setIsDesktopCardsDropdownOpen] = useState(false);
    const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Stāvoklis pieteikšanās modālajam logam
    
    // Uzlabota dubultklikšķa notikumu apstrāde
    const DCLICK_THRESHOLD = 300; // Milisekundes: Maksimālais laiks starp klikšķiem, lai to uzskatītu par dubultklikšķi
    let clickTimeout = null; // Taimauts, lai atšķirtu vienu klikšķi no dubultklikšķa

    const handleBannerClick = () => {
        // Notīrīt iepriekšējo taimautu, ja tas ir aktīvs
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
            // Šis ir otrais klikšķis pietiekami ātri, lai būtu dubultklikšķis
            setIsLoginModalOpen(true);
        } else {
            // Šis ir pirmais klikšķis. Iestatiet taimautu, lai gaidītu otru klikšķi.
            clickTimeout = setTimeout(() => {
                clickTimeout = null; // Notīrīt taimautu, ja otrais klikšķis nenotiek laikā
            }, DCLICK_THRESHOLD);
        }
    };


    const closeMenus = () => {
        setIsMobileMenuOpen(false);
        setIsDesktopCardsDropdownOpen(false);
        setIsMobileSubMenuOpen(false);
    };

    const handleSectionClick = (sectionId, themeId) => {
        onSectionSelect(sectionId);
        onThemeSelect(themeId);
        closeMenus();
    };

    const handleThemeClick = (themeId) => {
        onSectionSelect('recommendations');
        onThemeSelect(themeId);
        closeMenus();
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
        setIsDesktopCardsDropdownOpen(false);
    };

    const toggleMobileSubMenu = (e) => {
        e.stopPropagation();
        setIsMobileSubMenuOpen(prev => !prev);
    };

    // Funkcija, kas tiek izsaukta pēc veiksmīgas administratora pieteikšanās
    const handleLoginSuccess = () => {
        console.log('Administratora pieteikšanās veiksmīga!');
        // Novirzīt uz 'admin' sadaļu
        onSectionSelect('admin');
        setIsLoginModalOpen(false); // Aizver modālo logu
    };

    const headerGifs = [
        { url: import.meta.env.BASE_URL + "images/img_1920.gif", alt: "Header Banner GIF 1", width: "auto" },
    ];

    const recommendationsThemes = [
        { id: 'all', name: 'Visas' },
        ...(Array.isArray(themes)
            ? themes.filter(t => t && typeof t === 'object' && 'id' in t && ![1, 'all', 104, 105, 106, 107, 108, 109].includes(t.id))
            : [])
    ].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <header className="app-header">
            {/* Banera josla, tagad ar vienu klikšķa apstrādātāju */}
            <div className="header-banner" onClick={handleBannerClick}>
                <div className="site-tagline">
                    Brīvprātīgā kustība pret Spānijas kailgliemezi
                </div>
                {headerGifs.map((gif, index) => (
                    <img key={index} src={gif.url} alt={gif.alt} className="header-gif" style={{ width: gif.width }} />
                ))}
            </div>

            <div className="main-header-content">
                {/* Logo / Vietnes nosaukums - izmanto `onClick` ar `onSectionSelect` */}
                <span className="site-logo-placeholder" onClick={() => handleSectionClick('home', 1)} aria-label="Sākumlapa"><i>Arion vulgaris</i></span>

                {/* Hamburgera izvēlne mobilajām ierīcēm */}
                <button
                    className={`hamburger-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Atvērt navigācijas izvēlni"
                >
                    <span className="hamburger-label">Izvēlne</span>
                    <div className="hamburger-icon-wrapper">
                        <span className="hamburger-icon"></span>
                        <span className="hamburger-icon"></span>
                        <span className="hamburger-icon"></span>
                    </div>
                </button>

                {/* Galvenā navigācija */}
                <nav className={`main-navigation ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><button type="button" onClick={() => handleSectionClick('home', 1)} className={activeSection === 'home' ? 'active' : ''}>Sākums</button></li>
                        <li><button type="button" onClick={() => handleSectionClick('association', 104)} className={activeSection === 'association' ? 'active' : ''}>Biedrība</button></li>
                        <li><button type="button" onClick={() => handleSectionClick('stories', 106)} className={activeSection === 'stories' ? 'active' : ''}>Stāsti</button></li>

                        <li
                            className={`nav-item dropdown ${isDesktopCardsDropdownOpen ? 'open-desktop' : ''} ${isMobileSubMenuOpen ? 'open-mobile-submenu' : ''}`}
                            onMouseEnter={() => window.innerWidth > 1120 && setIsDesktopCardsDropdownOpen(true)}
                            onMouseLeave={() => window.innerWidth > 1120 && setIsDesktopCardsDropdownOpen(false)}
                        >
                            <button
                                type="button"
                                onClick={(e) => window.innerWidth <= 1120 ? toggleMobileSubMenu(e) : handleSectionClick('recommendations', 'all')}
                                className={`dropbtn ${activeSection === 'recommendations' ? 'active' : ''}`}
                            >
                                Ieteikumi
                                <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow-icon" />
                            </button>
                            <div className="dropdown-content">
                                {recommendationsThemes.map((theme) => (
                                    <button type="button" key={theme.id} onClick={() => handleThemeClick(theme.id)} className={activeTheme === theme.id && activeSection === 'recommendations' ? 'active' : ''}>
                                        {theme.name}
                                    </button>
                                ))}
                            </div>
                        </li>

                        <li><button type="button" onClick={() => handleSectionClick('trade', 105)} className={activeSection === 'trade' ? 'active' : ''}>Tirdzniecība</button></li>
                        <li><button type="button" onClick={() => handleSectionClick('prints', 107)} className={activeSection === 'prints' ? 'active' : ''}>Izdrukām</button></li>
                        <li><button type="button" onClick={() => handleSectionClick('articles', 108)} className={activeSection === 'articles' ? 'active' : ''}>Raksti</button></li>
                        <li><button type="button" onClick={() => handleSectionClick('videos', 109)} className={activeSection === 'videos' ? 'active' : ''}>Video</button></li>
                        <li><button type="button" onClick={() => handleSectionClick('admin', '')} className={activeSection === 'admin' ? 'active' : ''}>Pārvaldība</button></li>
                    </ul>
                </nav>
            </div>

            {/* Administratora pieteikšanās modālais logs */}
            <AdminLoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </header>
    );
};

export default Header;
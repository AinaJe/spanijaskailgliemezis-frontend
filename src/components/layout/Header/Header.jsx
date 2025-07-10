// src/components/layout/Header/Header.jsx
import React, { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header = ({ themes, activeTheme, onThemeSelect, activeSection, onSectionSelect }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopCardsDropdownOpen, setIsDesktopCardsDropdownOpen] = useState(false);
    const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);

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

    // LABOJUMS: Tagad šī funkcija izsauc closeMenus(), lai aizvērtu visu.
    const handleThemeClick = (themeId) => {
        onThemeSelect(themeId);
        onSectionSelect('recommendations');
        closeMenus(); // Aizveram visu vaļā esošo navigāciju
    };
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
        setIsDesktopCardsDropdownOpen(false);
    };

    const toggleMobileSubMenu = (e) => {
        e.stopPropagation();
        setIsMobileSubMenuOpen(prev => !prev);
    };

    const headerGifUrl = "/images/img_1920.gif";

    const recommendationsThemes = [
        { id: 'all', name: 'Visas' },
        ...(Array.isArray(themes)
            ? themes.filter(t => t && typeof t === 'object' && 'id' in t && ![1, 'all', 104, 105, 106, 107, 108, 109].includes(t.id))
            : [])
    ].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <header className="app-header">
            <div className="site-tagline">
                Brīvprātīgā kustība pret Spānijas kailgliemezi
            </div>

            <div className="header-banner">
                <img src={headerGifUrl} alt="Header Banner GIF" className="header-gif" />
            </div>

            <div className="main-header-content">
                <span className="site-logo-placeholder" onClick={() => handleSectionClick('home', 1)} aria-label="Sākumlapa"><i>Arion vulgaris</i></span>

                <button
                    className={`hamburger-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Atvērt navigācijas izvēlni"
                >
                    <span className="hamburger-icon"></span>
                    <span className="hamburger-icon"></span>
                    <span className="hamburger-icon"></span>
                </button>

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
        </header>
    );
};

export default Header;
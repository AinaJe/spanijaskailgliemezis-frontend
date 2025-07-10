// src/components/layout/Header/Header.jsx
import React, { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

/**
 * Galvenes (Header) komponente.
 * Nodrošina vietnes navigāciju, logo, saukli un responsīvu hamburgera izvēlni.
 * @param {object} props - Komponentes props.
 * @param {Array<object>} props.themes - Tēmu masīvs, ko izmanto "Ieteikumu" nolaižamajā izvēlnē.
 * @param {number|string} props.activeTheme - Pašreizējās aktīvās tēmas ID.
 * @param {function} props.onThemeSelect - Funkcija, kas tiek izsaukta, izvēloties tēmu.
 * @param {string} props.activeSection - Pašreizējās aktīvās sadaļas ID (piem., 'home', 'recommendations').
 * @param {function} props.onSectionSelect - Funkcija, kas tiek izsaukta, izvēloties sadaļu.
 */
const Header = ({ themes, activeTheme, onThemeSelect, activeSection, onSectionSelect }) => {
    // Stāvoklis mobilās izvēlnes atvēršanai/aizvēršanai
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Stāvoklis darbvirsmas "Ieteikumu" nolaižamās izvēlnes atvēršanai/aizvēršanai
    const [isDesktopCardsDropdownOpen, setIsDesktopCardsDropdownOpen] = useState(false);

    /**
     * Apstrādā sadaļas izvēli navigācijas izvēlnē.
     * Iestata aktīvo sadaļu un tēmu.
     * @param {string} sectionId - Izvēlētās sadaļas ID.
     */
    const handleSectionClick = (sectionId) => {
        onSectionSelect(sectionId);
        setIsMobileMenuOpen(false);
        setIsDesktopCardsDropdownOpen(false);

        switch (sectionId) {
            case 'home':
                onThemeSelect(1); // ID 1 ir "Sākums"
                break;
            case 'recommendations':
                onThemeSelect('all'); // ID 'all' ir "Visas" (noklusējums "Ieteikumos")
                break;
            case 'association':
                onThemeSelect(104); // ID 104 ir "Biedrība"
                break;
            case 'trade':
                onThemeSelect(105); // ID 105 ir "Tirdzniecība"
                break;
            case 'stories':
                onThemeSelect(106); // ID 106 ir "Stāsti"
                break;
            case 'prints':
                onThemeSelect(107); // ID 107 ir "Izdrukām"
                break;
            case 'articles':
                onThemeSelect(108); // ID 108 ir "Raksti"
                break;
            case 'videos':
                onThemeSelect(109); // ID 109 ir "Video"
                break;
            default:
                onThemeSelect(''); // Citos gadījumos tēmu nenorāda
                break;
        }
    };

    /**
     * Apstrādā tēmas izvēli no "Ieteikumu" nolaižamās izvēlnes.
     * Iestata aktīvo tēmu un pārslēdzas uz "Ieteikumi" sadaļu.
     * @param {number|string} themeId - Izvēlētās tēmas ID.
     */
    const handleThemeClick = (themeId) => {
        onThemeSelect(themeId);
        onSectionSelect('recommendations');
        
        setIsMobileMenuOpen(false);
        setIsDesktopCardsDropdownOpen(false);
    };

    /**
     * Pārslēdz mobilās izvēlnes (hamburgera) atvēršanas stāvokli.
     */
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsDesktopCardsDropdownOpen(false);
    };

    /**
     * Pārslēdz darbvirsmas "Ieteikumu" nolaižamās izvēlnes atvēršanas stāvokli.
     * @param {object} [e] - Notikuma objekts (izvēles).
     */
    const toggleDesktopCardsDropdown = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setIsDesktopCardsDropdownOpen(prev => !prev);
    };

    // Header banera GIF URL (jābūt public mapē)
    const headerGifUrl = "/images/img_1920.gif";

    // Filtrē tēmas, kas parādīsies "Ieteikumu" nolaižamajā izvēlnē.
    // Izslēdz galvenās navigācijas sadaļas vai speciālās grupas tēmas.
    // Pievienojam robustu null-check un pārbaudām, vai themes ir masīvs,
    // un katram elementam ir 'id' īpašība, pirms to filtrējam.
    const recommendationsThemes = [
        { id: 'all', name: 'Visas' }, // ID 'all' ir "Visas"
        ...(Array.isArray(themes)
            ? themes.filter(t => t && typeof t === 'object' && 'id' in t && ![1, 'all', 104, 105, 106, 107, 108, 109].includes(t.id))
            : [])
    ].sort((a, b) => {
        // Pārbaudām, vai 'name' īpašība eksistē un ir string
        const nameA = typeof a.name === 'string' ? a.name : '';
        const nameB = typeof b.name === 'string' ? b.name : '';
        return nameA.localeCompare(nameB);
    });

    return (
        <header className="app-header">
            <div className="site-tagline">
                Brīvprātīgā kustība pret Spānijas kailgliemezi
            </div>

            <div className="header-banner">
                <img src={headerGifUrl} alt="Header Banner GIF" className="header-gif" />
            </div>

            <div className="main-header-content">
                <span className="site-logo-placeholder" onClick={() => handleSectionClick('home')} aria-label="Sākumlapa"><i>Arion vulgaris</i></span>

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
                        <li>
                            <button
                                type="button"
                                onClick={() => handleSectionClick('home')}
                                className={activeSection === 'home' ? 'active' : ''}
                                aria-current={activeSection === 'home' ? 'page' : undefined}
                            >
                                Sākums
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => handleSectionClick('association')}
                                className={activeSection === 'association' ? 'active' : ''}
                                aria-current={activeSection === 'association' ? 'page' : undefined}
                            >
                                Biedrība
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => handleSectionClick('stories')}
                                className={activeSection === 'stories' ? 'active' : ''}
                                aria-current={activeSection === 'stories' ? 'page' : undefined}
                            >
                                Stāsti
                            </button>
                        </li>
                        <li
                            className={`nav-item dropdown ${activeSection === 'recommendations' ? 'active' : ''} ${isDesktopCardsDropdownOpen || (isMobileMenuOpen && activeSection === 'recommendations') ? 'open-desktop open-mobile-submenu' : ''}`}
                        >
                            <button
                                type="button"
                                onClick={(e) => {
                                    if (window.innerWidth > 768) {
                                        toggleDesktopCardsDropdown(e);
                                    } else {
                                        toggleDesktopCardsDropdown(e);
                                    }
                                }}
                                className={`dropbtn ${activeSection === 'recommendations' ? 'active' : ''}`}
                                aria-expanded={isDesktopCardsDropdownOpen || (isMobileMenuOpen && activeSection === 'recommendations')}
                                aria-current={activeSection === 'recommendations' ? 'page' : undefined}
                                aria-haspopup="true"
                            >
                                Ieteikumi
                                {recommendationsThemes.length > 0 && (
                                    <span
                                        className="dropdown-arrow-icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleDesktopCardsDropdown(e);
                                        }}
                                        aria-hidden="true"
                                    >
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </span>
                                )}
                            </button>
                            {recommendationsThemes.length > 0 && (
                                <div className="dropdown-content">
                                    {recommendationsThemes.map((theme) => (
                                        <button
                                            type="button"
                                            key={theme.id}
                                            onClick={() => handleThemeClick(theme.id)}
                                            className={activeTheme === theme.id && activeSection === 'recommendations' ? 'active' : ''}
                                            aria-current={activeTheme === theme.id && activeSection === 'recommendations' ? 'page' : undefined}
                                        >
                                            {theme.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => handleSectionClick('trade')}
                                className={activeSection === 'trade' ? 'active' : ''}
                                aria-current={activeSection === 'trade' ? 'page' : undefined}
                            >
                                Tirdzniecība
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => handleSectionClick('prints')}
                                className={activeSection === 'prints' ? 'active' : ''}
                                aria-current={activeSection === 'prints' ? 'page' : undefined}
                            >
                                Izdrukām
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => handleSectionClick('articles')}
                                className={activeSection === 'articles' ? 'active' : ''}
                                aria-current={activeSection === 'articles' ? 'page' : undefined}
                            >
                                Raksti
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => handleSectionClick('videos')}
                                className={activeSection === 'videos' ? 'active' : ''}
                                aria-current={activeSection === 'videos' ? 'page' : undefined}
                            >
                                Video
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => handleSectionClick('admin')}
                                className={activeSection === 'admin' ? 'active' : ''}
                                aria-current={activeSection === 'admin' ? 'page' : undefined}
                            >
                                Pārvaldība
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
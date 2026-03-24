import logoSvg from '../assets/logo.svg';
import homeSvg from '../assets/home.svg?raw';
import sun from '../assets/sun.svg?raw';
import moon from '../assets/moon.svg?raw';
import {t} from "../core/i18n.js";
import {settingsStorage} from "../core/storage.js";

export const Header = () => {

    const currentLang = settingsStorage.getLanguage();

    return `
    <div class="header-wrapper">
        
        <div class="header-content">
        
            <!--      TOP ROW      -->
            <div class="header-row-top">
                <div class="language-dropdown">
                    <button id="lang-toggle">${currentLang}▼</button>
                    <div class="language-dropdown-options" id="lang-menu">
                        <span data-lang="en">ENG</span>
                        <span data-lang="ee">EST</span>
                        <span data-lang="ru">RUS</span>
                    </div>
                </div>
            
               <button id="theme-toggle" class="light-dark-button">
                  <span class="icon-sun">${sun}</span>
                  <span class="icon-moon">${moon}</span>
               </button>
            </div>
            
            <!--      MIDDLE ROW      -->
            <div class="header-row-mid">
            
                <div class="header-row-mid-left">
                    <img src=${logoSvg} alt="Logo" class="" />

                    <div class="header-row-mid-left-buttons desktop-only">
                        <a href="#/" class="active">Parody</a>
                        <a href="https://www.swedbank.ee/" target="_blank" rel="noopener noreferrer">Real Deal</a>
                    </div>
                </div>
                
                <!-- Right Side Actions -->
                <div class="header-row-mid-right">
                
                  <div class="contacts-dropdown desktop-only">
                      <span>${t('header_contacts')}</span>
                      <div class="contacts-dropdown-options" >
                          <span>${t('not_a_bank')}</span>
                          <span>${t('inquiries')}</span>
                          <span>aleksei.kuroljov@gmail.com</span>
                      </div>
                  </div>

                    <!-- Hamburger Icon -->
                    <div id="hamburger-btn" class="hamburger-menu" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            
            <!--     BOTTOM ROW       -->
            <div class="header-row-bot desktop-only">
                
                <div class="left-item">
                      <a href="#/" data-link class="nav-svg-link">
                        ${homeSvg}
                    </a>
                </div>
                
                    <nav class="navbar">
                        <a href="#/loan-calculator" data-link>${t('header_nav_calculator')}</a>
                        <a href="#/extras" data-link>${t('header_nav_extras')}</a>
                    </nav>
                    
                <div class="right-item">${t('header_search')}</div>
            </div>
            
            <!--  MOBILE DROPDOWN MENU  -->
            <nav id="mobile-nav" class="mobile-nav-menu" aria-label="Mobile navigation">
                <a href="#/" data-link class="mobile-link">${t('header_nav_home')}</a>
                <a href="#/loan-calculator" data-link class="mobile-link">${t('header_nav_calculator')}</a>
                <a href="#/extras" data-link class="mobile-link">${t('header_nav_extra')}</a>
                <a href="https://www.swedbank.ee/" target="_blank" rel="noopener noreferrer" class="mobile-link">Real Deal</a>
            </nav>
        </div>
    </div>
  `;
};

export const initHeader = () => {
    const btn = document.getElementById('hamburger-btn');
    const nav = document.getElementById('mobile-nav');
    const content = document.querySelector('.header-content');

    if (!btn || !nav) return;

    const openMenu = () => {
        content.classList.add('nav-open');
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', 'Close navigation menu');
    };

    const closeMenu = () => {
        content.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open navigation menu');
    };

    // Toggle on button click
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = content.classList.contains('nav-open');
        isOpen ? closeMenu() : openMenu();
    });

    nav.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close when a nav link is clicked
    nav.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && content.classList.contains('nav-open')) {
            closeMenu();
        }
    });

    // Close when clicking outside the header
    document.addEventListener('click', (e) => {
        if (!content.contains(e.target) && content.classList.contains('nav-open')) {
            closeMenu();
        }
    });
};
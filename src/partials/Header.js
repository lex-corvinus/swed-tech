import logoSvg from '../assets/logo.svg';
import homeSvg from '../assets/home.svg';

export const Header = () => {

    return `
    <div class="header-wrapper">
        
        <div class="header-content">
        
            <!--      TOP ROW      -->
            <div class="header-row-top">
               
                <div>
                    <span id="theme-toggle" class="text-link">Change Theme</span>
                </div>
            </div>
            
            <!--      MIDDLE ROW      -->
            <div class="header-row-mid">
            
                <div class="header-row-mid-left">
                    <img src=${logoSvg} alt="Logo" class="" />

                    <div class="header-row-mid-left-buttons">
                        <a href="#/" class="active">Parody</a>
                        <a href="https://www.swedbank.ee/" target="_blank" rel="noopener noreferrer">Real Deal</a>
                    </div>
                </div>
                
                <div class="contacts-dropdown">
                    <span>Contacts</span>
                    <div class="contacts-dropdown-options" >
                        <span>SOME COOL</span>
                        <span>INFO WILL</span>
                        <span>BE HERE</span>
                    </div>
                </div>
            </div>
            
            <!--     BOTTOM ROW       -->
            <div class="header-row-bot">
            
                <div class="left-item">
                    <a href="/" data-link class="nav-svg-link">
                        <img src=${homeSvg} alt="Logo" class="home-icon" />
                    </a>
                </div>
                
                    <nav class="navbar">
                        <a href="#/loan-calculator" data-link>Loan Calculator</a>
                        <a href="#/extra" data-link>Extra</a>
                    </nav>
                    
                <div class="right-item">Search</div>
            </div>
        </div>
    </div>
  `;
};
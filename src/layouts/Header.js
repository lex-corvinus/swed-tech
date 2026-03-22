export const Header = () => {

    return `
    <div class="header-wrapper">
        
        <div class="header-content">
        
            <!--      TOP ROW      -->
            <div class="header-row-top">
            
                <span>Login / Register</span>
            </div>
            
            <!--      MIDDLE ROW      -->
            <div class="header-row-mid">
            
                <span>Left Info</span>
                <span>Right Info</span>
            </div>
            
            <!--     BOTTOM ROW       -->
            <div class="header-row-bot">
            
                <div class="left-item">Icon</div>
                
                    <nav  class="navbar">
                        <a href="/" data-link>Home</a>
                        <a href="/intro" data-link>Intro</a>
                        <a href="/loan-calculator" data-link>Loan Calculator</a>
                        <a href="/extra" data-link>Extra</a>
                    </nav>
                    
                <div class="right-item">Search</div>
            </div>
        </div>
    </div>
  `;
};
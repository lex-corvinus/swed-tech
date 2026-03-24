import photoWhat from '../../assets/loan_picture.jpg';
import photoWhen from '../../assets/koodJohvi_002.jpg';
import photoWhy from '../../assets/group_photo.jpg';
import {t} from "../../core/i18n.js";

export const Home = () => {

    return `
<!--  What  -->
    <div class="home-content-window">
        
        <div class="upper-main-content-window">
          <span class="step active">What</span>
          <span class="dot"></span>
          <span class="step">When</span>
          <span class="dot"></span>
          <span class="step">Why</span>
        </div>
        
        <div class="what-lower-main-content-window">
          
            <div class="what-lower-left-box">
                
                <div class="side-panel"> 
<!-- Junior Front-End Developer Assignment -->
                  <span class="primary-text">${t('home_test')}</span>
                  <span class="description-from-type-label">Technical Challenge by Swedbank</span>
                  </div>
                
                <div class="what-main-panel">
                     <ul class="what-list-of-items">
                        <li>HTML, CSS, JavaScript (no frameworks).</li>
                        <li>"Swedbank-like"style.</li>
                        <li>Single Page Application.</li>
                        <li>4-step Loan Calculator.</li>
                        <li>Made for modern browsers (Chrome / Firefox).</li>
                      </ul>
                 </div>
            </div>
            
            <div class="lower-right-box">
                <img src=${photoWhat} alt="group photo" class="side-photo">
            </div>
        </div>
    </div>
    
<!--  When -->
    <div class="home-content-window">
        
        <div class="upper-main-content-window">
          <span class="step">What</span>
          <span class="dot"></span>
          <span class="step active">When</span>
          <span class="dot"></span>
          <span class="step">Why</span>
        </div>
        
        <div class="when-lower-main-content-window">
          
            <div class="when-lower-left-box">
                
                <div class="side-panel"> 
                  <span class="primary-text">kood/Jõhvi JobFair</span>
                  <span class="description-from-type-label">27th of March 2026.</span>
                  <span class="description-from-type-label">3rd floor</span>
                </div>
                
                <div class="when-main-panel">
                     <span>Jõhvi, Ida-Virumaa</span>
                     <span>Address: Tartu põik 5</span>
                     <span>Post code: 41537</span>
                 </div>
            </div>
            
            <div class="lower-right-box">
                <img src=${photoWhen} alt="Kood building" class="side-photo">
            </div>
        </div>
    </div>
    
<!--  Why  -->
    <div class="home-content-window">
        
        <div class="upper-main-content-window">
          <span class="step">What</span>
          <span class="dot"></span>
          <span class="step">When</span>
          <span class="dot"></span>
          <span class="step active">Why</span>
        </div>
        
        <div class="why-lower-main-content-window">
          
            <div class="why-lower-left-box">
                
                <div class="side-panel"> 
                  <span class="primary-text">Full workflow demonstration:</span>
                </div>
                
                <div class="why-main-panel">
                  <ul class="why-list-of-items">
                    <li>
                      <strong class="item-title">Front-End skills:</strong>
                      <a href="#" class="item-link">github link</a>
                    </li>
                
                    <li>
                      <strong class="item-title">Agile Planning & Teamwork:</strong>
                      <span class="item-link">> Shortcut link here..........</span>
                    </li>
                
                    <li>
                      <strong class="item-title">Design & UI, UX:</strong>
                      <span class="item-link">> figma link here ........</span>
                    </li>
                
                    <li>
                      <strong class="item-title">Presentation & soft skills:</strong>
                      <span class="item-link">> 27th of March, kood/Jõhvi (3rd floor)</span>
                    </li>
                  </ul>
                 </div>
            </div>
            
            <div class="lower-right-box">
                <img src=${photoWhy} alt="group photo" class="side-photo">
            </div>
        </div>
    </div>
<!--  Made by  -->
    <div class="home-content-window">
        
        <div class="upper-main-content-window">
         <span class="step active"> Made by: </span>
        </div>
        
        <div class="lower-main-content-window">
          
          <a href="#/loan-calculator" class="start-btn" style="text-decoration: none;" onclick="window.scrollTo(0,0);">
            START APPLICATION
          </a>
        </div>
    </div>
`;
}

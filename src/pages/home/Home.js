import photoWhat from '../../assets/loan_picture.jpg';
import photoWhen from '../../assets/koodJohvi_002.jpg';
import photoWhy from '../../assets/group_photo.jpg';
import {t} from "../../core/i18n.js";

export const Home = () => {

    return `
    <!-- WHAT -->
    <div class="home-content-window">
        
        <div class="upper-main-content-window">
          <span class="step active">${t('step_what')}</span>
          <span class="dot"></span>
          <span class="step">${t('step_when')}</span>
          <span class="dot"></span>
          <span class="step">${t('step_why')}</span>
        </div>
        
        <div class="what-lower-main-content-window">
          
            <div class="what-lower-left-box">
                
                <div class="side-panel"> 
                  <span class="primary-text">${t('home_test')}</span>
                  <span class="description-from-type-label">${t('home_what_subtitle')}</span>
                  </div>
                
                <div class="what-main-panel">
                     <ul class="what-list-of-items">
                        <li>${t('home_what_li_1')}</li>
                        <li>${t('home_what_li_2')}</li>
                        <li>${t('home_what_li_3')}</li>
                        <li>${t('home_what_li_4')}</li>
                        <li>${t('home_what_li_5')}</li>
                      </ul>
                 </div>
            </div>
            
            <div class="lower-right-box">
                <img src=${photoWhat} alt="group photo" class="side-photo">
            </div>
        </div>
    </div>
    
    <!-- WHEN -->
    <div class="home-content-window">
        
        <div class="upper-main-content-window">
          <span class="step">${t('step_what')}</span>
          <span class="dot"></span>
          <span class="step active">${t('step_when')}</span>
          <span class="dot"></span>
          <span class="step">${t('step_why')}</span>
        </div>
        
        <div class="when-lower-main-content-window">
          
            <div class="when-lower-left-box">
                
                <div class="side-panel"> 
                  <span class="primary-text">${t('home_when_title')}</span>
                  <span class="description-from-type-label">${t('home_when_date')}</span>
                  <span class="description-from-type-label">${t('home_when_floor')}</span>
                </div>
                
                <div class="when-main-panel">
                     <span>${t('home_when_city')}</span>
                     <span>${t('home_when_address')}</span>
                     <span>${t('home_when_postal')}</span>
                 </div>
            </div>
            
            <div class="lower-right-box">
                <img src=${photoWhen} alt="Kood building" class="side-photo">
            </div>
        </div>
    </div>
    
    <!-- WHY -->
    <div class="home-content-window">
        
        <div class="upper-main-content-window">
          <span class="step">${t('step_what')}</span>
          <span class="dot"></span>
          <span class="step">${t('step_when')}</span>
          <span class="dot"></span>
          <span class="step active">${t('step_why')}</span>
        </div>
        
        <div class="why-lower-main-content-window">
          
            <div class="why-lower-left-box">
                
                <div class="side-panel"> 
                  <span class="primary-text">${t('home_why_title')}</span>
                </div>
                
                <div class="why-main-panel">
                  <ul class="why-list-of-items">
                    <li>
                      <strong class="item-title">${t('home_why_li_1_title')}</strong>
                      <a href="#/loan-calculator" class="item-link">${t('home_why_li_1_link')}</a>
                    </li>
                
                    <li>
                      <strong class="item-title">${t('home_why_li_2_title')}</strong>
                      <span class="item-link">${t('home_why_li_2_link')}</span>
                    </li>
                
                    <li>
                      <strong class="item-title">${t('home_why_li_3_title')}</strong>
                      <span class="item-link">${t('home_why_li_3_link')}</span>
                    </li>
                
                    <li>
                      <strong class="item-title">${t('home_why_li_4_title')}</strong>
                      <span class="item-link">${t('home_why_li_4_link')}</span>
                    </li>
                  </ul>
                 </div>
            </div>
            
            <div class="lower-right-box">
                <img src=${photoWhy} alt="group photo" class="side-photo">
            </div>
        </div>
    </div>
    
    <div class="home-content-window">
        
        <div class="upper-main-content-window">
         <span class="step active"> ${t('home_made_by')} </span>
        </div>
        
        <div class="lower-main-content-window">
          
          <a href="#/loan-calculator" class="start-btn" style="text-decoration: none;" onclick="window.scrollTo(0,0);">
            ${t('home_start_btn')}
          </a>
        </div>
    </div>
`;
}
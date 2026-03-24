import { t } from "../core/i18n.js";

export const Footer = () => {
	return `
    <div class="footer-wrapper">
    
        <div class="footer-content">
    
            <div class="footer-content-col">
            
                <h3 class="devs">Aleksei Kurõljov</h3>
                <p>Focus: Frontend</p>
                <p><a target="_blank" href="https://www.linkedin.com/in/aleksei-kuroljov/">LinkedIn</a></p>
                <p>Team Lead</p>
            </div>
        
            <div class="footer-content-col">
            
                <h3 class="devs">Vladislav Nesterenko</h3>
                <p>Focus: Backend</p>
                <p><a target="_blank" href="https://www.linkedin.com/in/vladislav-nesterenko-b156a9368/">LinkedIn</a></p>
                <p><a target="_blank" href="https://cvpro.ee/en">Collaboration</a></p>
            </div>
        
            <div class="footer-content-col">
            
                <h3 class="devs">Artjom Kulikovski</h3>
                <p>Focus: Frontend</p>
                <p><a target="_blank" href="https://www.linkedin.com/in/artyom-kulikovski/">LinkedIn</a></p>
                <p><a target="_blank" href="https://idaoptika.ee/et">Personal project</a></p>
            </div>
            
            <div class="footer-content-col">
            
                <h3 class="devs">Team activities</h3>
                
                <p>Accelerator #1 place:</p>
                <p><a target="_blank" href="https://disainikeskus.ee/projekt/disaini-ja-ringmajanduse-arengukiirendi-ida-virumaal/">Estonian Design Centre Article</a></p>
                
                <p><a target="_blank" href="https://tastetea.eu/ceremony-start">MVP:TasteTea.eu</a></p>
                
            </div>
        </div>
        
        <div class="footer-legal">
            ${t("footer_legal")}
        </div>
    </div>
    `;
};

import { Step1 } from "./Step1.js";
import { Step2 } from "./Step2.js";
import { Step3 } from "./Step3.js";
import { Step4 } from "./Step4.js";
import { Step5 } from "./Step5.js";

const stepComponents = {
	1: Step1,
	2: Step2,
	3: Step3,
	4: Step4,
	5: Step5,
};

const stepConfig = {
	1: { title: "Step 1:", desc: "This is step 1" },
	2: { title: "Step 2:", desc: "This is step 2" },
	3: { title: "Step 3:", desc: "This is step 3" },
	4: { title: "Step 4:", desc: "This is step 4" },
	5: { title: "Step 5: Summary", desc: "This is step 5, summary." },
};

export const LoanCalculator = {
	render: () => {
		return `
            <div id="loan-calculator">
            
                <div class="main-content-window calculator-header">
                
                    <div class="calculator-header-top">
                        <h2 id="step-title">Step 1</h2>
                        
                        <div class="calculator-steps">
                            <div class="step-indicator" id="ind-1">I</div>
                            <div class="step-indicator" id="ind-2">II</div>
                            <div class="step-indicator" id="ind-3">III</div>
                            <div class="step-indicator" id="ind-4">IV</div>
                        </div>
                    </div>
                    
                    <div class="calculator-header-bot">
                        <div id="step-desc">Description goes here</div>
                        
                        <div class="steps-navigation">
                            <button type="button" class="step-btn" id="btn-back">
                                <span class="triangle-left"></span> BACK
                            </button>
                            
                            <button type="button" class="step-btn" id="btn-next">
                                <span class="triangle-right"></span> NEXT
                            </button>
                        </div>
                    </div>
                </div>

                <div class="main-content-window" id="step-container"></div>
            </div>
        `;
	},

	init: () => {
		const container = document.getElementById("loan-calculator");
		const stepContainer = document.getElementById("step-container");
		if (!container || !stepContainer) return;

		let currentStep = 1;
		const totalSteps = Object.keys(stepComponents).length;

		const titleEl = container.querySelector("#step-title");
		const descEl = container.querySelector("#step-desc");
		const btnBack = container.querySelector("#btn-back");
		const btnNext = container.querySelector("#btn-next");

		const onStateChange = () => validateCurrentStep();

		function mountStep(stepIndex) {
			titleEl.textContent = stepConfig[stepIndex].title;
			descEl.textContent = stepConfig[stepIndex].desc;
			stepContainer.innerHTML = stepComponents[stepIndex].render();

			updateIndicators(stepIndex);
			updateNavigation(stepIndex);
		}

		function validateCurrentStep() {
			btnBack.disabled = currentStep === 1;

			if (stepComponents[currentStep].isValid) {
				btnNext.disabled = !stepComponents[currentStep].isValid();
			} else {
				btnNext.disabled = currentStep === totalSteps;
			}
		}

		function updateNavigation(stepIndex) {
			btnBack.disabled = stepIndex === 1;

			btnNext.innerHTML = '<span class="triangle-right"></span> NEXT';
		}

		function updateIndicators(targetStep) {
			for (let i = 1; i <= totalSteps; i++) {
				const indicator = container.querySelector(`#ind-${i}`);
				if (!indicator) continue;

				indicator.classList.remove(
					"icon-completed",
					"icon-active",
					"icon-inactive",
				);

				if (i < targetStep) {
					indicator.classList.add("icon-completed");
				} else if (i === targetStep) {
					indicator.classList.add("icon-active");
				} else {
					indicator.classList.add("icon-inactive");
				}
			}
		}

		btnBack.addEventListener("click", (e) => {
			e.preventDefault();
			if (currentStep > 1) {
				currentStep--;
				mountStep(currentStep);
			}
		});

		btnNext.addEventListener("click", (e) => {
			e.preventDefault();
			if (currentStep < totalSteps) {
				currentStep++;
				mountStep(currentStep);
			} else {
				console.log("Mockup: Final Step Submitted");
			}
		});

		mountStep(currentStep);
	},
};

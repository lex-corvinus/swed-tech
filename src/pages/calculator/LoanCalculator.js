import { Step1 } from "./Step1.js";
import { Step2 } from "./Step2.js";
import { Step3 } from "./Step3.js";
import { Step4 } from "./Step4.js";
import { Step5 } from "./Step5.js";

import {Component} from "../../core/Component.js";

const stepComponents = {
	1: Step1,
	2: Step2,
	3: Step3,
	4: Step4,
	5: Step5
};

const stepDescription = {
	1: "Step1 desc",
	2: "Step2 desc",
	3: "Step3 desc",
	4: "Step4 desc",
	5: "Step5 desc"
}

export class LoanCalculator extends Component {
	constructor(containerElement) {

		super(containerElement, {
			currentStep: 1,
			totalSteps: 5,
			formData: {}
		});

		this.activeStepInstance = null;
		this.updateDOM();
	}

	// helper for step indicators
	getIndicatorClass(stepIndex) {
		const { currentStep, totalSteps } = this.state;

		if (currentStep === totalSteps) {
			return 'icon-completed';
		}

		if (stepIndex < currentStep) {
			return 'icon-completed';
		} else if (stepIndex === currentStep) {
			return 'icon-active';
		} else {
			return 'icon-inactive';
		}
	}

	bindEvents() {
		super.bindEvents();

		const stepSlot = this.container.querySelector('#step-container');
		const StepClass = stepComponents[this.state.currentStep];

		if (StepClass && stepSlot) {
			if (this.activeStepInstance) this.activeStepInstance.destroy();

			this.activeStepInstance = new StepClass(stepSlot, this.state.formData);
			this.activeStepInstance.updateDOM();
		}
	}

	handleEvents(e) {
		const target = e.target.closest('button');
		if (!target) return;

		if (target.id === 'btn-next' && this.state.currentStep < this.state.totalSteps) {
			this.setState({ currentStep: this.state.currentStep + 1 });
		}

		if (target.id === 'btn-back' && this.state.currentStep > 1) {
			this.setState({ currentStep: this.state.currentStep - 1 });
		}
	}

	render() {
		const { currentStep, totalSteps } = this.state;
		const isFirstStep = currentStep === 1;

		return `
		<div class="calculator-wrapper">

			<div class="main-content-window calculator-header">
				<div class="calculator-header-top">
					<h2 class="step-title">Step ${currentStep}:</h2>
					
					<div class="calculator-steps">
						<div class="step-indicator ${this.getIndicatorClass(1)}" id="ind-1">I</div>
						<div class="step-indicator ${this.getIndicatorClass(2)}" id="ind-2">II</div>
						<div class="step-indicator ${this.getIndicatorClass(3)}" id="ind-3">III</div>
						<div class="step-indicator ${this.getIndicatorClass(4)}" id="ind-4">IV</div>
					</div>
				</div>
				
				<div class="calculator-header-bot">
					<div id="step-desc">${stepDescription[currentStep]}</div>
					
					<div class="steps-navigation">
						<button type="button" class="step-btn" id="btn-back"
						${isFirstStep ? 'disabled' : ''}>
						
							<span class="triangle-left"></span> BACK
						</button>
						
						<button type="button" class="step-btn" id="btn-next"
						${ (currentStep === totalSteps) ? 'disabled' : ''}>
						
							<span class="triangle-right"></span> NEXT
						</button>
					</div>
				</div>
            </div>
            
            <div class="main-content-window"> 
									
				<!-- SLOT goes here -->
				<div id="step-container"></div>
			</div>
		</div>
        `;
	}
}
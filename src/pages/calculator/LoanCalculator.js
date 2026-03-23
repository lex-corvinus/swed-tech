import { Step1 } from "./Step1.js";
import { Step2 } from "./Step2.js";
import { Step3 } from "./Step3.js";
import { Step4 } from "./Step4.js";
import { Step5 } from "./Step5.js";

import { Component } from "../../core/Component.js";
import { storage } from "../../utils/storage.js";

const stepComponents = {
	1: Step1,
	2: Step2,
	3: Step3,
	4: Step4,
	5: Step5,
};

const stepsData = {
	1: { title: "Step 1: Employment Status", desc: "Step1 desc" },
	2: { title: "Step 2: Loan Calculator", desc: "Step2 desc" },
	3: { title: "Step 3: Consents", desc: "Step3 desc" },
	4: { title: "Step 4: Additional Info", desc: "Step4 desc" },
	5: { title: "Summary:", desc: "Step5 desc" },
};

export class LoanCalculator extends Component {
	constructor(containerElement) {
		const savedState = storage.load();

		super(containerElement, {
			currentStep: 1,
			totalSteps: 5,
			formData: savedState.formData,
		});

		this.activeStepInstance = null;
		this.updateDOM();
	}

	persist() {
		storage.save({
			currentStep: this.state.currentStep,
			formData: this.state.formData,
		});
	}

	updateGlobalData(newData) {
		this.setState({
			formData: { ...this.state.formData, ...newData },
		});
		this.persist();
	}

	// helper for step indicators
	getIndicatorClass(stepIndex) {
		const { currentStep, totalSteps } = this.state;

		if (currentStep === totalSteps) {
			return "icon-completed";
		}

		if (stepIndex < currentStep) {
			return "icon-completed";
		} else if (stepIndex === currentStep) {
			return "icon-active";
		} else {
			return "icon-inactive";
		}
	}

	bindEvents() {
		super.bindEvents();

		const stepSlot = this.container.querySelector("#step-container");
		const StepClass = stepComponents[this.state.currentStep];

		if (this.activeStepInstance) this.activeStepInstance.destroy();

		// passing wrapped props: state as data & updateGlobalData as onUpdate -> to child
		this.activeStepInstance = new StepClass(stepSlot, {
			data: this.state.formData,
			onUpdate: (newData) => this.updateGlobalData(newData),
		});

		this.activeStepInstance.updateDOM();
	}

	handleEvents(e) {
		const target = e.target.closest("button");
		if (!target) return;

		if (
			target.id === "btn-next" &&
			this.state.currentStep < this.state.totalSteps
		) {
			this.setState({ currentStep: this.state.currentStep + 1 });
			this.persist();
		}

		if (target.id === "btn-back" && this.state.currentStep > 1) {
			this.setState({ currentStep: this.state.currentStep - 1 });
			this.persist();
		}
	}

	render() {
		const { currentStep, totalSteps } = this.state;
		const isFirstStep = currentStep === 1;

		return `
		<div class="calculator-wrapper">

			<div class="main-content-window calculator-header">
				<div class="calculator-header-top">
					<h2 class="step-title">${stepsData[currentStep].title}</h2>
					
					<div class="calculator-steps">
						<div class="step-indicator ${this.getIndicatorClass(1)}" id="ind-1">I</div>
						<div class="step-indicator ${this.getIndicatorClass(2)}" id="ind-2">II</div>
						<div class="step-indicator ${this.getIndicatorClass(3)}" id="ind-3">III</div>
						<div class="step-indicator ${this.getIndicatorClass(4)}" id="ind-4">IV</div>
					</div>
				</div>
				
				<div class="calculator-header-bot">
					<div id="step-desc">${stepsData[currentStep].desc}</div>
					
					<div class="steps-navigation">
						<button type="button" class="step-btn" id="btn-back"
						${isFirstStep ? "disabled" : ""}>
						
							<span class="triangle-left"></span> BACK
						</button>
						
						<button type="button" class="step-btn" id="btn-next"
						${currentStep === totalSteps ? "disabled" : ""}>
						
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

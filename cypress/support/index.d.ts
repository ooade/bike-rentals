/// <reference types="Cypress" />

declare namespace Cypress {
	interface Chainable<Subject> {
		login(): void;
		getByTestId(testId: string): Chainable<any>;
	}
}

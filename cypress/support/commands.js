/// <reference types="Cypress" />

Cypress.Commands.add('login', () => {
	cy.intercept('GET', '/api/session', { fixture: 'session' });
});

Cypress.Commands.add('getByTestId', (testId) => {
	return cy.get(`[data-testid=${testId}]`);
});

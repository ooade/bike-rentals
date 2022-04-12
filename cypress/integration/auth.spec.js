/// <reference types="Cypress" />

describe('User', () => {
	it('can create an account', () => {
		cy.intercept('POST', '/register', {}).as('createUserAccount');
		cy.visit('/register');

		cy.get('#email').type('ooade96@gmail.com');
		cy.get('#password').type('johndoe');
		cy.get('button').click();

		cy.wait('@createUserAccount').then(({ request }) => {
			cy.wrap(request.body).should('deep.equal', {
				email: 'ooade96@gmail.com',
				password: 'johndoe',
			});
		});
	});

	it('can login to an account', () => {
		cy.intercept('POST', '/login', {}).as('loginUserAccount');
		cy.visit('/login');

		cy.get('#email').type('ooade96@gmail.com');
		cy.get('#password').type('johndoe');
		cy.get('button').click();

		cy.wait('@loginUserAccount').then(({ request }) => {
			cy.wrap(request.body).should('deep.equal', {
				email: 'ooade96@gmail.com',
				password: 'johndoe',
			});
		});
	});
});

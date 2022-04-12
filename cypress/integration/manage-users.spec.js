/// <reference types="../support" />

describe('Manage users', () => {
	beforeEach(() => {
		cy.login();
		cy.intercept('GET', '/api/users', { fixture: 'users' }).as('fetchUsers');
		cy.visit('/manage/users');
	});

	it('can show the list of users', () => {
		cy.getByTestId('users').children().should('have.length', 9);
		cy.getByTestId('user-0').within(() => {
			cy.contains('ooade96@gmail.com');
		});
		cy.getByTestId('user-1').within(() => {
			cy.contains('ooade96+1@gmail.com');
		});
	});

	it('can add users', () => {
		cy.intercept('POST', '/api/users', {}).as('addUser');
		cy.contains('Add new user').click();
		cy.get('#email').clear().type('ademola@ps.com');
		cy.get('#password').clear().type('#checkers');
		cy.get('#fullname').clear().type('Ademola');
		cy.get('#role').select('manager');
		cy.contains('Submit').click();

		cy.wait('@addUser').then(({ request }) => {
			cy.wrap(request.body).should('deep.equal', {
				email: 'ademola@ps.com',
				password: '#checkers',
				fullname: 'Ademola',
				role: 'manager',
			});
		});
	});

	it('can edit users', () => {
		cy.intercept('PATCH', '/api/users/*', {}).as('updateUser');
		cy.getByTestId('user-1').within(() => {
			cy.contains('Edit').click();
		});
		cy.get('#email').clear().type('ademola@ps.com');
		cy.get('#fullname').clear().type('Ademola');
		cy.get('#role').select('manager');
		cy.contains('Submit').click();

		cy.wait('@updateUser').then(({ request }) => {
			cy.wrap(request.body).should('deep.equal', {
				email: 'ademola@ps.com',

				fullname: 'Ademola',
				role: 'manager',
			});
		});
	});

	it('can remove users', () => {
		cy.intercept('DELETE', '/api/users/*', {}).as('removeUser');
		cy.getByTestId('user-1').within(() => {
			cy.contains('Remove').click();
		});
		cy.getByTestId('remove-user-button').click();
	});
});

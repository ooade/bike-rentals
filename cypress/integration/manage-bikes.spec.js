/// <reference types="../support" />

describe('Manage bikes', () => {
	beforeEach(() => {
		cy.login();
		cy.intercept('GET', '/bikes', { fixture: 'bikes' }).as('fetchBikes');
		cy.visit('/manage/bikes');
	});

	it('can show the list of bikes', () => {
		cy.getByTestId('bikes').children().should('have.length', 6);
		cy.getByTestId('bike-0').within(() => {
			cy.contains('MX 350');
		});
		cy.getByTestId('bike-1').within(() => {
			cy.contains('MX 550');
		});
	});

	it('can edit bikes', () => {
		cy.intercept('PATCH', '/bikes/*', {}).as('editBike');
		cy.getByTestId('bike-0').within(() => {
			cy.get('[aria-label="Open menu"]').click();
		});
		cy.contains('Edit').click();
		cy.get('#model').clear().type('BX 200');
		cy.get('#location').clear().type('Manchester');
		cy.get('button[type=submit]').click();

		cy.wait('@editBike').then(({ request }) => {
			cy.wrap(request.body).should('contain', {
				model: 'BX 200',
				location: 'Manchester',
			});
		});
	});

	it('can delete a bike', { scrollBehavior: false }, () => {
		cy.intercept('DELETE', '/bikes/*', {}).as('deleteBike');
		cy.getByTestId('bike-0').within(() => {
			cy.get('[aria-label="Open menu"]').click();
			cy.getByTestId('remove-bike').click();
		});
		cy.getByTestId('remove-bike-button').click();
	});
});

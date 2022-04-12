/// <reference types="../support" />

describe('Reservations', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/reservations');
		cy.intercept('GET', '/reservations', { fixture: 'reservations' });
	});

	it('can render a list of user resrvations', () => {
		cy.getByTestId('reservations').children().should('have.length', 2);
		cy.getByTestId('reservation-0')
			.should('contain', 'MX 450')
			.and('contain', 'Burundi');
		cy.getByTestId('reservation-1')
			.should('contain', 'MX 250')
			.and('contain', 'Lagos, Nigeria');
	});

	it('can cancel a reservation', () => {
		cy.intercept('DELETE', 'reservations/*', {}).as('removeReservation');

		cy.getByTestId('reservation-0').within(() => {
			cy.get('button').click();
		});

		cy.contains('Confirm').click();
		cy.wait('@removeReservation').then(({ request }) => {
			cy.wrap(request.url).should('contain', '625544dce52f4db6f5bb3ae7');
		});
	});
});

/// <reference types="../support" />

describe('Manage Reservations', () => {
	beforeEach(() => {
		cy.login();
		cy.intercept('GET', '/reservations/users', {
			fixture: 'reservation-users',
		}).as('fetchReservationUsers');
	});

	it('can show the list of reservation users', () => {
		cy.visit('/manage/reservations');
		cy.getByTestId('reservation-users').children().should('have.length', 4);
		cy.getByTestId('reservation-user-0').contains('ooade96@gmail.com');
		cy.getByTestId('reservation-user-1').contains('ooade96+2@gmail.com');
		cy.getByTestId('reservation-user-2').contains('hi@hi.com');
		cy.getByTestId('reservation-user-3').contains('ademola@paystack.com');
	});

	it('can list user reservations', () => {
		cy.intercept('GET', 'reservations/users/*', {
			fixture: 'user-reservations',
		});
		cy.visit('/manage/reservations/62514417a78da89371b3916a');

		cy.getByTestId('user-reservations').contains('MX 250');
		cy.getByTestId('user-reservations').contains('Lagos, Nigeria');
	});
});

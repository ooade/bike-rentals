/// <reference types="../support" />

describe('Home', () => {
	beforeEach(() => {
		cy.login();
		cy.intercept('GET', '/bikes**', { fixture: 'bikes' }).as('fetchBikes');
		cy.visit('/');
	});

	it('can render a list of bikes', () => {
		cy.getByTestId('bikes').children().should('have.length', 6);
		cy.getByTestId('bike-0').should('contain', 'MX 350');
		cy.getByTestId('bike-0').should('contain', 'San Francisco');
		cy.getByTestId('bike-1').should('contain', 'MX 550');
		cy.getByTestId('bike-1').should('contain', 'Burundi');
	});

	it('can filter bikes', () => {
		cy.getByTestId('filter-bikes').click();
		cy.get('#location').type('Lagos');
		cy.get('#model').type('MX 250');
		cy.get('#average_rate').type('3');
		cy.get('button[type=submit]').click();

		cy.url().should('include', 'model=MX+250&location=Lagos&average_rate=3');
	});

	it('can filter bikes by available dates', () => {
		cy.getByTestId('filter-bikes').click();
		cy.get('#status').select('available_dates');
		cy.get('#from').type('2025-03-04');
		cy.get('#to').type('2025-03-24');
		cy.get('button[type=submit]').click();
		cy.url().should(
			'include',
			'available_to=2025-03-24&available_from=2025-03-04'
		);
	});

	it('can reserve a bike for a specific period', () => {
		cy.intercept('POST', '/reservations/bikes/*').as('reserveBike');
		cy.getByTestId('bike-1').within(() => {
			cy.get('button').click();
		});
		cy.get('#from').type('2023-04-05');
		cy.get('#to').type('2023-05-05');
		cy.get('#reserve-bike-form').submit();

		cy.wait('@reserveBike').then(({ request }) => {
			cy.wrap(request.body).should('deep.equal', {
				from: '2023-04-05',
				to: '2023-05-05',
			});
		});
	});

	it('can rate a bike', () => {
		cy.intercept('POST', '/bikes/*/review').as('rateBike');

		cy.getByTestId('bike-1').within(() => {
			cy.getByTestId('star-4').click();
		});

		cy.wait('@rateBike').then(({ request }) => {
			cy.wrap(request.body).should('deep.equal', {
				rate: 5,
			});
		});
	});
});

describe('restaurant client flow test', () => {
  it('passes', () => {
    cy.visit('/restaurant/62c1a011e95e96a91dbfd023?step=guest');
    // Test the guest component
    cy.get('[data-cy="add-guest"]').click();
    cy.get('[data-cy="input-guest"]').should('have.value', '2');
    cy.get('[data-cy="button-guest"]').click();
    cy.location().should((loc) => {
      expect(loc.search).to.contains('step=menu');
    });

    // Test the menu component
    cy.get('[data-cy="add-menu"]').click();
    cy.intercept('GET', '**/month*').as('getMonth');
    cy.get('[data-cy="button-menu"]').click();
    cy.location().should((loc) => {
      expect(loc.search).to.contains('step=calendar');
    });

    // Test the calendar component
    cy.wait('@getMonth');
    cy.wait('@getMonth');
    cy.wait('@getMonth');
    cy.get('.green').first().click();
    cy.get('[data-cy=input-duration]').click();
    cy.contains('Long').click();
    cy.get('[data-cy="add-time"]')
      .children()
      .first()
      .should('not.contain', 'Indisponible pour Reservation')
      .click();
    cy.location().should((loc) => {
      expect(loc.search).to.contains('step=condition');
    });

    // Test the condition component
    cy.get('[data-cy="button-condition"]').click();
    cy.location().should((loc) => {
      expect(loc.search).to.contains('step=reservation');
    });

    // Test the reservationForm component
    cy.get('[data-cy="input-name"]').type('Chez med');
    cy.get('[data-cy="input-mail"]').type('invalid-email');
    cy.get('[data-cy="input-phone"]').type('not-a-number');
    cy.get('[data-cy="form-reservation"]').submit();
    cy.contains('email incorrect').should('be.visible');
    cy.contains('Numero incorrect').should('be.visible');

    cy.get('[data-cy="input-name"]').clear();
    cy.get('[data-cy="input-mail"]').clear();
    cy.get('[data-cy="input-phone"]').clear();

    cy.get('[data-cy="input-name"]').type('chez Med');
    cy.get('[data-cy="input-mail"]').type('john@example.com');
    cy.get('[data-cy="input-phone"]').type('1234567890');
    cy.get('[data-cy="form-reservation"]').submit();

    cy.location().should((loc) => {
      expect(loc.search).to.contains('step=confirmation');
    });
  });
});

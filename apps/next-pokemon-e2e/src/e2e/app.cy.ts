describe('next-pokemon', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.get('input').first().type('bulb');
    cy.get('li').first().should('have.text', 'Bulbasaur');
  });
});

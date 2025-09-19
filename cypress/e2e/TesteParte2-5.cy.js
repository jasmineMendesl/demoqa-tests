describe('Teste Parte 2-5', () => {
  Cypress.on('uncaught:exception', () => false);

  it('Reordena elementos da lista', () => {
    cy.visit('https://demoqa.com/');
    cy.contains('Interactions').click();
    cy.contains('Sortable').click();
    cy.contains('List').click();
    cy.get('.vertical-list-container > :nth-child(1)', { timeout: 10000 })
      .should('be.visible');

    // mover Item 1 para a posição do Item 4
    cy.get('.vertical-list-container > :nth-child(1)')
      .trigger('mousedown', { which: 1 });

    cy.get('.vertical-list-container > :nth-child(4)')
      .trigger('mousemove')
      .trigger('mouseup', { force: true });

    cy.get('.vertical-list-container > :nth-child(4)')
      .should('contain.text', 'One'); // ajuste o texto conforme o item
  });
});

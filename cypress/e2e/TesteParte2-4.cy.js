describe('Teste parte 2-4', () => {

  // Ignora erros cross-origin
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  it('Valida progresso da barra de progresso', () => {
    cy.visit('https://demoqa.com/');
    cy.contains('Widgets').click();
    cy.contains('Progress Bar').click();
    cy.get('#startStopButton').click();

    // Espera a barra chegar perto de 25% e para
    cy.get('.progress-bar')
      .should(($bar) => {
        const valor = parseInt($bar.attr('aria-valuenow')); // pega valor atual
        if (valor >= 25) {
          cy.get('#startStopButton').click(); // para o progresso
        }
        expect(valor).to.be.lte(25); 
      });

    cy.get('#startStopButton').click();
    cy.get('.progress-bar').should(($bar) => {
      const valor = parseInt($bar.attr('aria-valuenow'));
      expect(valor).to.be.lte(100);
    });
  });

});

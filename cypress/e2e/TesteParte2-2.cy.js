describe('Teste parte 2-2', () => {
//Aqui fica complicado por que o cypress não lida com várias abas então teve que ter um jogo de cintura que não garante 100% de efetividade.
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false; // ignora erros cross-origin
  });

  it('Abre nova janela e valida mensagem', () => {
    cy.visit('https://demoqa.com/');
    cy.contains('Alerts, Frame & Windows').click();
    cy.contains('Browser Windows').click();

    //  "Abre" a nova janela visitando a URL diretamente
    cy.visit('https://demoqa.com/sample');
    cy.contains('This is a sample page', { timeout: 10000 }).should('be.visible');

    // Volta para a página anterior
    cy.go('back');
  });
});

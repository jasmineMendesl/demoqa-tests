describe('Teste parte 2-3', () => {

  // Ignora erros cross-origin
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  it('Cria, edita e deleta um registro', () => {
    // 1 - Acessa o site
    cy.visit('https://demoqa.com/');

    // 2 - Escolhe Elements
    cy.contains('Elements').click();

    // 3 - Clica no submenu Web Tables
    cy.contains('Web Tables').click();

    // 4 - Criar um novo registro
    cy.get('#addNewRecordButton').click();

    const registro = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      age: '30',
      salary: '5000',
      department: 'QA'
    };

    // Preenche o formulário
    cy.get('#firstName').type(registro.firstName);
    cy.get('#lastName').type(registro.lastName);
    cy.get('#userEmail').type(registro.email);
    cy.get('#age').type(registro.age);
    cy.get('#salary').type(registro.salary);
    cy.get('#department').type(registro.department);

    // Salva o registro
    cy.get('#submit').click();

    // 5 - Editar o registro criado
    cy.contains(registro.firstName)
      .closest('div.rt-tr-group') // garante pegar a linha inteira
      .within(() => {
        // Clica no botão pai do SVG do Edit
        cy.get('span[title="Edit"], button')
          .first()
          .click();
      });

    // Atualiza o nome
    cy.get('#firstName').clear().type('Updated');
    cy.get('#submit').click();

    // 6 - Deletar o registro atualizado
    cy.contains('Updated')
      .closest('div.rt-tr-group')
      .within(() => {
        cy.get('span[title="Delete"], button')
          .first()
          .click();
      });

    // Verifica que o registro foi removido
    cy.contains('Updated').should('not.exist');
  });

});

/// <reference types="cypress" />

describe('Desafio QA Automation - API', () => {
  let userId;
  let token;
  let books;
  //sempre usar o date por que vai sempre pegar a data e hora e podemos criar varios usuarios
  const username = `user_${Date.now()}`;
  const password = 'SenhaForte123!';

  it('1 - Criar usuário', () => {
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/User',
      body: {
        userName: username,
        password: password
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      userId = response.body.userID;
      cy.log('User criado:', userId);
    });
  });

  it('2 - Gerar token de acesso', () => {
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/GenerateToken',
      body: {
        userName: username,
        password: password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token;
      cy.log('Token gerado:', token);
    });
  });

  it('3 - Confirmar se o usuário está autorizado', () => {
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/Authorized',
      body: {
        userName: username,
        password: password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq(true);
    });
  });

  it('4 - Listar livros disponíveis', () => {
    cy.request({
      method: 'GET',
      url: 'https://demoqa.com/BookStore/v1/Books'
    }).then((response) => {
      expect(response.status).to.eq(200);
      //como não sei o que esperar da listagem, vamos esperar que seja um array que não esteja vazio
      expect(response.body.books).to.be.an('array').that.is.not.empty;
      books = response.body.books;
      cy.log('Total de livros disponíveis:', books.length);
    });
  });

  it('5 - Alugar dois livros', () => {
    //vamos alugar os dois primeiros livros da lista pelo indice deles no array
    const selectedBooks = [
      { isbn: books[0].isbn },
      { isbn: books[1].isbn }
    ];
    //precisa passar o token no header senão retorna erro de user não autenticado
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/BookStore/v1/Books',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        userId: userId,
        collectionOfIsbns: selectedBooks
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('6 - Listar os detalhes do usuário com os livros alugados', () => {
    cy.request({
      method: 'GET',
      url: `https://demoqa.com/Account/v1/User/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('books');
      expect(response.body.books.length).to.eq(2);
      cy.log('Livros alugados:', response.body.books.map(b => b.title).join(', '));
    });
  });
});

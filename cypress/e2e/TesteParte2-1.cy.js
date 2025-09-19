describe('Teste parte 2-1', () => {
  // Coloque isso dentro do describe ou em cypress/support/e2e.js
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora todos os erros de script que não são do teste
  return false;
});

  // Usariamos a lib do faker, mas não sei se pode e não tenho tanto tempo.
  const randomString = (length) => Math.random().toString(36).substring(2, 2 + length);
  const randomNumberString = (length) => {
    let num = '';
    for (let i = 0; i < length; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  };
  const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

  it('Preenche o formulário com dados aleatórios', () => {
    cy.visit('https://demoqa.com/automation-practice-form');

    // Dados aleatórios
    const nome = randomString(5);
    const sobrenome = randomString(5);
    const email = `${nome}.${sobrenome}@teste.com`;
    const telefone = randomNumberString(10);
    const endereco = `${randomNumberString(3)} Rua ${randomString(5)}`;
    

    // 1 - Preencher campos de texto
    cy.get('#firstName').type(nome);
    cy.get('#lastName').type(sobrenome);
    cy.get('#userEmail').type(email);
    cy.get('#userNumber').type(telefone);
    cy.get('#currentAddress').type(endereco);
    

    // 2 - Selecionar gênero aleatório
    const generos = ['gender-radio-1', 'gender-radio-2', 'gender-radio-3'];
    cy.get(`label[for="${randomElement(generos)}"]`).click();

    // 3 - Data de nascimento aleatória
    const anos = Array.from({ length: 25 }, (_, i) => (1980 + i).toString());
    const meses = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dia = Math.floor(Math.random() * 28) + 1; // evita problemas com fevereiro
    const mesAleatorio = randomElement(meses);
    const anoAleatorio = randomElement(anos);

    // 4 - Subjects aleatórios
    const subjects = ['Maths', 'English', 'Physics', 'Biology', 'History'];
    const chosenSubjects = [];

    // Escolher 2 subjects aleatórios diferentes
    while (chosenSubjects.length < 2) {
      const s = randomElement(subjects);
      if (!chosenSubjects.includes(s)) chosenSubjects.push(s);
    }
    // Preencher o campo 
    chosenSubjects.forEach(sub => {
      cy.get('#subjectsInput').type(`${sub}{enter}`);
    });

    // Abre o calendário
    cy.get('#dateOfBirthInput').click();

    // Seleciona ano e mês
    cy.get('.react-datepicker__year-select').select(anoAleatorio);
    cy.get('.react-datepicker__month-select').select(mesAleatorio);

    // Seleciona o dia correto dentro do mês visível
    cy.get('.react-datepicker__month')
      .contains(new RegExp(`^${dia}$`))
      .click();

    // 5 - Hobbies aleatórios
    const hobbies = ['hobbies-checkbox-1', 'hobbies-checkbox-2', 'hobbies-checkbox-3'];
    const chosenHobbies = [randomElement(hobbies), randomElement(hobbies)];
    chosenHobbies.forEach(h => cy.get(`label[for="${h}"]`).click());

    // 6 - Upload de arquivo (certifique-se que o arquivo existe em cypress/fixtures)
    cy.get('#uploadPicture').selectFile('cypress/fixtures/arquivotxt.txt', { force: true });

    // 7 - Estado e cidade aleatórios
    const estadosCidades = {
      'NCR': ['Delhi', 'Gurgaon', 'Noida'],
      'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
      'Haryana': ['Karnal', 'Panipat'],
      'Rajasthan': ['Jaipur', 'Jaiselmer']
    };
    const estado = randomElement(Object.keys(estadosCidades));
    const cidade = randomElement(estadosCidades[estado]);
    // Selecionar Estado
    cy.get('#state > .css-yk16xz-control > .css-1hwfws3').click({ force: true }); // abre o dropdown
    cy.get('div#state div.css-26l3qy-menu div')
      .contains(estado)
      .click({ force: true }); // seleciona o estado

      // Abrir o dropdown da cidade
    cy.get('#city').click({ force: true });

    // 8 - Submeter o formulário
    cy.get('#submit').click();

    cy.get('#example-modal-sizes-title-lg')
    .should('be.visible')
    .and('contain.text', 'Thanks for submitting the form'); 
    cy.get('#closeLargeModal').click({ force: true });

  });
});

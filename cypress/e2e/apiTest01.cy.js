describe('Testando API Reqres', () => {
  it('Deve retornar a lista com sucesso (GET call)', () => {
    cy.request('GET', 'https://reqres.in/api/users?page').then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('Deve retornar um usuario com sucesso (GET call)', () => {
    cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.property('id', 2);
    });
  });

  it('Deve criar um usuario com sucesso (POST call)', () => {
    cy.request('POST', 'https://reqres.in/api/users', {
      name: "Nathan",
      job: "QA Engineer"
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('name', 'Nathan');
      expect(response.body).to.have.property('job', 'QA Engineer');
    });
  });

  it('Deve atualizar um dado do usuario com sucesso (PUT call)', () => {
    cy.request('PUT', 'https://reqres.in/api/users/2', {
      name: 'Nathan',
      job: 'QA Engineer'
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('name', 'Nathan')
      expect(response.body).to.have.property('job', 'QA Engineer')
    });
  });

  it('Deve deletar um usuario com suceso (DELETE call)', () => {
    cy.request('DELETE', 'https://reqres.in/api/users/2')
      .then((response) => {
        expect(response.status).to.equal(204)

        cy.request({
          method: 'GET',
          url: 'https://reqres.in/api/users/2',
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(404);
        });
      });
  });

  it('Deve registar o usuario com sucesso (POST call)', () => {
    cy.request('POST', 'https://reqres.in/api/register', {
      email: `Email${Math.floor(Math.random() * 1000)}`,
      password: Math.random().toString(36).slice(-8)
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });

  it.only('Deve dar um erro ao tentar registrar um usuario (POST call)', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      body: { email: `Email${Math.floor(Math.random() * 1000)}` }, 
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.equal(400); 
    });
    
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      failOnStatusCode: false, 
      body: {} 
    }).then((response) => {
      expect(response.status).to.equal(400); 
    });
    
  });

  it('Deve realizar o login com sucesso', () => {
    cy.request('POST', 'https://reqres.in/api/login', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('token')
    });
  });
});
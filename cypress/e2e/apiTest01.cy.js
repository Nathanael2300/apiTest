describe('Testando API Reqres (GET call)', () => {
  it('Deve retornar a lista com sucesso', () => {
    cy.request('GET', 'https://reqres.in/api/users?page').then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('Deve retornar um usuario com sucesso', () => {
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

  it.only('Deve registar o usuario com sucesso (POST call)', () => {
    cy.request('POST', 'https://reqres.in/api/register', {
      email: `testuser@gmail.com`,
      password: 'test1234'
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });
});
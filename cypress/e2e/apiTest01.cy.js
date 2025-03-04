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

  it('Deve criar um usuario com sucesso', () => {
    cy.request('POST', 'https://reqres.in/api/users', {
      name: "Nathan",
      job: "QA Engineer"
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('name', 'Nathan');
      expect(response.body).to.have.property('job', 'QA Engineer');
    });
  });
});


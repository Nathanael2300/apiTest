describe('API Reqres', () => {
  it.only('Criar Usuário e Validar a Resposta', () => {
    cy.request('POST', 'https://reqres.in/api/users', {
      name: 'morpheus',
      job: 'leader'
    }).should((res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('createdAt');
    });
  });

  it.only('Deve retornar um usuario com sucesso (GET call)', () => {
    cy.request('GET', 'https://reqres.in/api/users/2').should((res) => {
      expect(res.status).to.equal(200)
      expect(res.body.data).to.have.property('id', 2)
    });
  });

  it.only('Deve criar um usuario com sucesso (POST call)', () => {
    cy.request('POST', 'https://reqres.in/api/users', {
      name: "Nathan",
      job: "QA Engineer"
    }).should((res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('createdAt');
    })
  });

  it.only('Deve atualizar um dado do usuario com sucesso (PUT call)', () => {
    cy.request('PUT', 'https://reqres.in/api/users/2', {
      name: 'Nathan',
      job: 'QA Engineer'
    }).should((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', 'Nathan');
      expect(res.body).to.have.property('job', 'QA Engineer');
    });
  });

  it.only('Deve deletar um usuario com suceso (DELETE call)', () => {
    cy.request('DELETE', 'https://reqres.in/api/users/2', {
      name: 'Matheus',
      job: 'Dev Python'
    }).should((res) => {
      expect(res.status).to.equal(204);
    })

    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      failOnStatusCode: false,
    }).should((res) => {
      expect(res.status).to.equal(404)
    })
  });

  it.only('Deve registar o usuario com sucesso (POST call)', () => {
    cy.request('POST', 'https://reqres.in/api/register', {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('token');
    });
  });

  it.only('Deve dar um erro ao tentar registrar um usuario (POST call)', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      body: { email: `Email${Math.floor(Math.random() * 1000)}` }, 
      failOnStatusCode: false 
    }).should((res) => {
      expect(res.status).to.equal(400); 
    });
    
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      failOnStatusCode: false, 
      body: {} 
    }).then((res) => {
      expect(res.status).to.equal(400); 
    });
  });

  it.only('Deve realizar o login com sucesso', () => {
    cy.request('POST', 'https://reqres.in/api/login', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }).then((res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('token')
    });
  });
});
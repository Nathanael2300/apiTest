describe('Testando o body(json)', () => {
    it('Deve criar um novo usuario', () => {
        cy.request('POST', ('https://reqres.in/api/users'), {
            email: 'lucas@example.com',
            password: 'senha123'
        }).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('id')
        });
    });

    it('Deve atualizar usuario', () => {
        cy.request('PUT', 'https://reqres.in/api/users/2', {
            name: 'Nathan',
            job: 'QA Engineer'
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('name', 'Nathan')
            expect(response.body).to.have.property('job', 'QA Engineer')
            expect(response.body).to.have.property('updatedAt')
        });
    });

    it('Deve Criar Usuário com Validação de Dados', () => {

        const user = {
            name: 'Maria Silva',
            password: 'segura123',
        }
        cy.request('POST', 'https://reqres.in/api/users', user).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('id');
            expect(response.body.name).to.equal(user.name);
            expect(response.body.password).to.equal(user.password)
        });
    });

    it('Deve Criar Usuário com Validação de Dados', () => {
        const user = {
            name: 'Maria Silva',
            password: 'segura123',
        }
        cy.request('DELETE', 'https://reqres.in/api/users/3', user).then((response) => {
            expect(response.status).to.equal(204);
        })

        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/3',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(404);
        })
    })
})
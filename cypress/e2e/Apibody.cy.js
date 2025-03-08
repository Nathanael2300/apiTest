describe('API Tests', () => {
    it('Deve criar um novo usuário', () => {
        cy.request('POST', 'https://reqres.in/api/users', {
            email: 'lucas@example.com',
            password: 'senha123'
        })
        .should((res) => {
            expect(res.status).to.equal(201);
        });
    });

    it('Deve atualizar um usuário', () => {
        cy.request('PUT', 'https://reqres.in/api/users/2', {
            name: 'Nathan',
            job: 'QA Engineer'
        })
        .should((res) => {
            expect(res.body).to.include({ name: 'Nathan', job: 'QA Engineer' });
            expect(res.body).to.have.property('updatedAt');
        });
    });

    it('Deve criar um usuário com validação de dados', () => {
        const user = { name: 'Maria Silva', password: 'segura123' };
        
        cy.request('POST', 'https://reqres.in/api/users', user)
        .should((res) => {
            expect(res.body).to.include({ name: user.name });
            expect(res.body).to.have.property('id');
        });
    });

    it('Deve deletar um usuário e validar exclusão', () => {
        cy.request('DELETE', 'https://reqres.in/api/users/3')
        .should((res) => {
            expect(res.status).to.equal(204);
        });

        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/3',
            failOnStatusCode: false,
        })
        .should((res) => {
            expect(res.status).to.equal(404);
        });
    });
});

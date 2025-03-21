describe('API Reqres', () => {
    Cypress._.times(5, () => {
        it('Deve registrar 5 usuarios (POST call)', () => {
            cy.api("POST", "https://reqres.in/api/register", {
                email: 'eve.holt@reqres.in',
                password: 'pistol',
            }).should((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('token');
            });
        });
    })


    it('Deve Validar Cabeçalhos da Resposta (GET call)', () => {
        cy.api('GET', 'https://reqres.in/api/users?page=1').should((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.length(6); 
        });
    });

    it('Deve Criar Usuário e Validar o Tempo de Resposta (POST call)', () => {
        cy.api('POST', 'https://reqres.in/api/users', {
            name: 'morpheus',
            job: 'Leader'
        }).should((res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('createdAt');
            expect(res.duration).to.be.lessThan(500);
        });
    });

    it('Deve Verificar Quantidade de Usuários Retornados (GET call)', () => {
        cy.api('GET', 'https://reqres.in/api/users?page=2').should((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.length(6);
        });
    });
});

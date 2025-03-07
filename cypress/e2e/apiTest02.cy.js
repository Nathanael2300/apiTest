const Users = [
    { email: "eve.holt@reqres.in", password: "pistol" },
    { email: "eve.holt@reqres.in", password: "pistol" },
    { email: "eve.holt@reqres.in", password: "pistol" },
    { email: "eve.holt@reqres.in", password: "pistol" },
    { email: "eve.holt@reqres.in", password: "pistol" },
    { email: "eve.holt@reqres.in", password: "pistol" },
    { email: "eve.holt@reqres.in", password: "pistol" },
    { email: "eve.holt@reqres.in", password: "pistol" },
    { email: "eve.holt@reqres.in", password: "pistol" },
    { email: "eve.holt@reqres.in", password: "pistol" }
];

describe('Testando API Reqres ', () => {
    for(let i = 1; i <= 10; i++) {
        const email = Users[0].email;
        const passoword = Users[0].password;
        it('Deve registrar 5 ususarios (POST call)', () => {
            cy.request("POST", "https://reqres.in/api/register", {
                email: email,
                password: passoword,
            }).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body).to.have.property('token')
            });
        });
    };


    it('Deve Validar Cabeçalhos da Resposta (GET call)', () => {
        cy.request('GET', 'https://reqres.in/api/users?page=1').then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.data).to.have.length(6) //tive que pedir ajuda
        });
    });

    it('Deve Criar Usuário e Validar o Tempo de Resposta (POST call)', () => {
        cy.request('POST', 'https://reqres.in/api/users', {
            name: 'morpheus',
            job: 'Leader'
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('createdAt')
            expect(response.duration).to.be.lessThan(500)
        });
    });

   

    it('Deve Verificar Quantidade de Usuários Retornados (GET call)', () => {
        cy.request('GET', 'https://reqres.in/api/users?page=2').then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data).to.have.length(6)
        });
    });

    it('D')
})
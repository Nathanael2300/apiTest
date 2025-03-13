Feature: Testes da API Reqres

  Scenario: Registrar múltiplos usuários com sucesso
    Given que a API de registro está disponível
    When eu envio 5 requisições POST para "/register" com email "eve.holt@reqres.in" e senha "pistol"
    Then todas as respostas devem ter o status 200
    And o corpo das respostas deve conter um "token"

  Scenario: Validar cabeçalhos da resposta ao listar usuários
    Given que existem usuários cadastrados na API
    When eu envio uma requisição GET para "/users?page=1"
    Then a resposta deve ter o status 200
    And o corpo da resposta deve conter exatamente 6 usuários

  Scenario: Criar um usuário e validar o tempo de resposta
    Given que a API de usuários está disponível
    When eu envio uma requisição POST para "/users" com nome "morpheus" e trabalho "Leader"
    Then a resposta deve ter o status 201
    And o corpo da resposta deve conter um "id" e "createdAt"
    And o tempo de resposta deve ser menor que 500ms

  Scenario: Verificar quantidade de usuários retornados na segunda página
    Given que existem múltiplos usuários cadastrados na API
    When eu envio uma requisição GET para "/users?page=2"
    Then a resposta deve ter o status 200
    And o corpo da resposta deve conter exatamente 6 usuários

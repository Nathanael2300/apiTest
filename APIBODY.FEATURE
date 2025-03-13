Feature: Testes do corpo das respostas da API

  Scenario: Criar um novo usuário
    Given que a API de usuários está disponível
    When eu envio uma requisição POST para "/users" com o email "lucas@example.com" e a senha "senha123"
    Then a resposta deve ter o status 201

  Scenario: Atualizar um usuário
    Given que o usuário com ID 2 está cadastrado na API
    When eu envio uma requisição PUT para "/users/2" com o nome "Nathan" e o trabalho "QA Engineer"
    Then a resposta deve conter os dados atualizados corretamente
    And deve incluir a propriedade "updatedAt"

  Scenario: Criar um usuário e validar os dados retornados
    Given que a API permite a criação de usuários
    When eu envio uma requisição POST para "/users" com o nome "Maria Silva" e a senha "segura123"
    Then a resposta deve conter o nome "Maria Silva"
    And deve incluir a propriedade "id"

  Scenario: Deletar um usuário e validar sua exclusão
    Given que o usuário com ID 3 existe na API
    When eu envio uma requisição DELETE para "/users/3"
    Then a resposta deve ter o status 204
    And ao tentar buscar o usuário novamente, a API deve retornar um erro indicando que ele não existe mais

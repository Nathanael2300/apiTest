Feature: Testes da API Reqres

  Scenario: Criar um usuário com sucesso
    Given que a API de usuários está disponível
    When eu envio uma requisição POST para "/users" com nome "morpheus" e trabalho "leader"
    Then a resposta deve ter o status 201
    And o corpo da resposta deve conter um "id" e "createdAt"

  Scenario: Buscar um usuário existente
    Given que existe um usuário cadastrado com ID 2
    When eu envio uma requisição GET para "/users/2"
    Then a resposta deve ter o status 200
    And o corpo da resposta deve conter o "id" 2

  Scenario: Criar um novo usuário
    Given que a API de usuários está disponível
    When eu envio uma requisição POST para "/users" com nome "Nathan" e trabalho "QA Engineer"
    Then a resposta deve ter o status 201
    And o corpo da resposta deve conter um "id" e "createdAt"

  Scenario: Atualizar um usuário existente
    Given que existe um usuário cadastrado com ID 2
    When eu envio uma requisição PUT para "/users/2" alterando o nome para "Nathan" e trabalho para "QA Engineer"
    Then a resposta deve ter o status 200
    And o corpo da resposta deve conter "name" como "Nathan" e "job" como "QA Engineer"

  Scenario: Deletar um usuário existente
    Given que existe um usuário cadastrado com ID 2
    When eu envio uma requisição DELETE para "/users/2"
    Then a resposta deve ter o status 204

  Scenario: Registrar um usuário com sucesso
    Given que a API de registro está disponível
    When eu envio uma requisição POST para "/register" com email "eve.holt@reqres.in" e senha "pistol"
    Then a resposta deve ter o status 200
    And o corpo da resposta deve conter um "id" e um "token"

  Scenario: Erro ao tentar registrar um usuário sem senha
    Given que a API de registro está disponível
    When eu envio uma requisição POST para "/register" apenas com um email válido
    Then a resposta deve ter o status 400

  Scenario: Erro ao tentar registrar um usuário sem dados
    Given que a API de registro está disponível
    When eu envio uma requisição POST para "/register" sem informações
    Then a resposta deve ter o status 400

  Scenario: Realizar login com sucesso
    Given que a API de login está disponível
    When eu envio uma requisição POST para "/login" com email "eve.holt@reqres.in" e senha "cityslicka"
    Then a resposta deve ter o status 200
    And o corpo da resposta deve conter um "token"

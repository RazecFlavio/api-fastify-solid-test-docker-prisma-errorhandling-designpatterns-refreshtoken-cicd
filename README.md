# App

Gympass style app

## RFS (Requisitos funcionais)
-   [x] =>  Deve ser possível se cadastrar;
-   [x] =>  Deve ser possível se autenticar;
-   [x] =>  Deve ser possível obter o perfil de um usuário logado;
-   [x] =>  Deve ser possível obter o numero de checkins realizados pelo usuário logado;
-   [x] =>  Deve ser possível obter seu historico de checkins;
-   [ ] =>  Deve ser possível o usuário buscar academias proximas;
-   [ ] =>  Deve ser possível o usuário buscar academias pelo nome;
-   [x] =>  Deve ser possível o usuario realizar checkin em uma academia;
-   [ ] =>  Deve ser possível validar o checkin de um usuario;
-   [x] =>  Deve ser possível cadastrar uma academia;

## RNs (Regras de negocios)
-   [x] =>  o usuario não deve poder se cadastrar com um e-mail duplicado;
-   [x] =>  o usuario não pode fazer dois checkins no mesmo dia;
-   [x] =>  o usuario não pode fazer checkin se nao estiver perto(100m) da academia;
-   [ ] =>  o checkin so pode ser validado após 20 minutos após criado;
-   [ ] =>  o checkin so pode ser validado por administradores;
-   [ ] =>  a academia so pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)
-   [x] =>  A senha do usuario precisa estar criptografada;
-   [x] =>  os dados da aplicação precisam estar persistido em um banco postgreSql;
-   [x] =>  todas as listas de dados precisam estar paginadas com 20 itens por pagina;
-   [ ] =>  o usuario deve ser identificado por um JWT(JSON Web Token);
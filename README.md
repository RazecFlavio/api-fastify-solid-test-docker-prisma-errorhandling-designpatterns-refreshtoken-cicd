# App

Gympass style app

## RFS (Requisitos funcionais)
-   [ ] =>  Deve ser possível se cadastrar;
-   [ ] =>  Deve ser possível se autenticar;
-   [ ] =>  Deve ser possível obter o perfil de um usuário logado;
-   [ ] =>  Deve ser possível obter o numero de checkins realizados pelo usuário logado;
-   [ ] =>  Deve ser possível obter seu historico de checkins;
-   [ ] =>  Deve ser possível o usuário buscar academias proximas;
-   [ ] =>  Deve ser possível o usuário buscar academias pelo nome;
-   [ ] =>  Deve ser possível o usuario realizar checkin em uma academia;
-   [ ] =>  Deve ser possível validar o checkin de um usuario;
-   [ ] =>  Deve ser possível cadastrar uma academia;

## RNs (Regras de negocios)
-   [ ] =>  o usuario não deve poder se cadastrar com um e-mail duplicado;
-   [ ] =>  o usuario não pode fazer dois checkins no mesmo dia;
-   [ ] =>  o usuario não pode fazer checkin se nao estiver perto(100m) da academia;
-   [ ] =>  o checkin so pode ser validado após 20 minutos após criado;
-   [ ] =>  o checkin so pode ser validado por administradores;
-   [ ] =>  a academia so pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)
-   [ ] =>  A senha do usuario precisa estar criptografada;
-   [ ] =>  os dados da aplicação precisam estar persistido em um banco postgreSql;
-   [ ] =>  todas as listas de dados precisam estar paginadas com 20 itens por pagina;
-   [ ] =>  o usuario deve ser identificado por um JWT(JSON Web Token);
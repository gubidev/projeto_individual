# Boilerplate MVC em Node.js com PostgreSQL

Este projeto é um boilerplate básico para uma aplicação Node.js seguindo o padrão MVC (Model-View-Controller), utilizando PostgreSQL como banco de dados.

## Requisitos

- Node.js (versão X.X.X)
- PostgreSQL (versão X.X.X)

Aqui está a tradução para português:

## 💻 Configuração para desenvolvimento e execução

Aqui você encontrará todas as instruções necessárias para instalar os programas, bibliotecas e ferramentas para configurar o ambiente de desenvolvimento.

1.  Baixe e instale o Node.js: [https://nodejs.org/en](https://nodejs.org/en) (versão 16.15.1 LTS)

2.  Clone o repositório e digite o seguinte comando no terminal para navegar até o caminho correto:

    ```
    git clone https://github.com/Inteli-College/2025-1B-T18-IN02-G05.git
    cd src
    ```

3.  Instale as dependências

    ```
    npm install
    ```

4.  Se necessário, instale também:

    ```
    npm install dotenv
    npm install ejs
    npm install express
    npm install pg
    npm install express-session
    ```

5.  Configure o ambiente:

    Crie o arquivo `.env` e preencha-o com as informações do seu projeto [Supabase](https://supabase.com/):

    ```
    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_PASSWORD=
    DB_DATABASE=
    PORT=3000
    ```

6.  Inicialize o banco de dados

    ```
    Execute o script "runSQLScript"

    ```

7.  Execute a aplicação

    ```
    node app.js
    ```

    A aplicação estará disponível em [**http://localhost:3000**](https://www.google.com/search?q=http://localhost:3000/).

Funcionalidades
---------------

* **Padrão MVC:** Estrutura organizada em Model, View e Controller.
* **PostgreSQL:** Banco de dados relacional utilizado para persistência dos dados.
* **UUID:** Utilização de UUID como chave primária na tabela `users`.
* **Scripts com `nodemon`:** Utilização do `nodemon` para reiniciar automaticamente o servidor após alterações no código.



Estrutura de Diretórios
-----------------------

* **`config/`**: Configurações do banco de dados e outras configurações do projeto.
* **`controllers/`**: Controladores da aplicação (lógica de negócio).
* **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
* **`routes/`**: Rotas da aplicação.
* **`tests/`**: Testes automatizados.
* **`views/`**: Views da aplicação (se aplicável).

Contribuição
------------

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request.

Licença
-------

Este projeto está licenciado sob a Licença MIT.


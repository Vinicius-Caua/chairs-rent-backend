# Aluguel de Cadeiras Backend

Este é o backend para o sistema de aluguel de cadeiras, desenvolvido com Node.js, Express, Sequelize e Swagger para documentação da API.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Execução com Docker](#execução-com-docker)
- [Endpoints da API](#endpoints-da-api)
- [Documentação da API](#documentação-da-api)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/aluguel-de-cadeiras-backend.git
    cd aluguel-de-cadeiras-backend
    ```

2. Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
    ```env
    # Database configuration
    USERNAME_DATABASE="postgres"
    PASSWORD_DATABASE="root"
    DATABASE_NAME="cadeiras_reserva"

    # Auth configuration
    SECRET_KEY="938a2d239cbbb529f897282ff36c2b9c"
    ```

2. Configure o banco de dados no arquivo `src/config/database.js` conforme necessário.

## Execução

1. Inicie o servidor em modo de desenvolvimento:
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

2. A API estará disponível em `http://localhost:3333`.

## Execução com Docker

1. Certifique-se de que você tem o Docker e o Docker Compose instalados.

2. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
    ```env
    # Database configuration
    USERNAME_DATABASE="postgres"
    PASSWORD_DATABASE="root"
    DATABASE_NAME="cadeiras_reserva"

    # Auth configuration
    SECRET_KEY="938a2d239cbbb529f897282ff36c2b9c"
    ```

3. Construa e inicie os contêineres:
    ```bash
    docker-compose up --build
    ```

4. A API estará disponível em `http://localhost:3333`.

## Endpoints da API

### Sessões

- **POST /sessions**: Cria uma nova sessão (login).

### Usuários

- **POST /users**: Cria um novo usuário.
- **PUT /users**: Atualiza um usuário (requer autenticação).

### Cadeiras

- **GET /chairs**: Lista todas as cadeiras.
- **POST /chairs**: Cria uma nova cadeira.
- **PUT /chairs/:id**: Atualiza uma cadeira.
- **DELETE /chairs/destroy/:id**: Deleta uma cadeira.

### Aluguéis

- **POST /rents**: Cria um novo aluguel.
- **PUT /rents/:id/return**: Devolve uma cadeira alugada.
- **GET /rents**: Lista todos os aluguéis.
- **PUT /rents/:id**: Atualiza um aluguel.
- **DELETE /rents/destroy/:id**: Deleta um aluguel.

## Documentação da API

A documentação da API é gerada automaticamente pelo Swagger. Para acessá-la, inicie o servidor e acesse `http://localhost:3333/api-docs`.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para Node.js.
- **PostgreSQL**: Banco de dados relacional.
- **JWT**: Autenticação baseada em tokens.
- **Yup**: Validação de esquemas.
- **Swagger**: Documentação da API.
- **Nodemon**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.
- **Sucrase**: Compilador para transformar código moderno em JavaScript compatível com Node.js.
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em contêineres.
- **Docker Compose**: Ferramenta para definir e gerenciar multi-contêineres Docker.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

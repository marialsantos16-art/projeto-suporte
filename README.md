# projeto-suporte
Sistema web de suporte técnico
# Sistema de Suporte Técnico

## Descrição

Sistema web desenvolvido para gerenciamento de chamados técnicos de uma empresa de tecnologia.

A aplicação permite cadastrar usuários, realizar login, cadastrar e consultar chamados, atualizar status e prioridade, filtrar chamados e excluir registros.

## Objetivo

O objetivo do sistema é substituir o controle manual de chamados por uma aplicação web integrada, permitindo o gerenciamento das solicitações de suporte técnico de forma organizada e centralizada.

## Integrantes

Maria Luiza de S dos Santos
## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Node.js
* Express
* MySQL
* MySQL2
* JWT
* Bcrypt
* CORS
* Dotenv
* Postman

## Arquitetura

O sistema utiliza a seguinte arquitetura:

```text
USUÁRIO
   ↓
FRONTEND
   ↓
API REST
   ↓
BACKEND NODE.JS / EXPRESS
   ↓
BANCO DE DADOS MYSQL
```

O frontend não acessa diretamente o banco de dados. Todas as operações são realizadas por meio da API REST.

## Estrutura do projeto

```text
projeto-suporte-tecnico/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── database/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── pages/
│   ├── css/
│   └── js/
│
├── evidencias/
│
├── .gitignore
└── README.md
```

## Banco de Dados

Banco utilizado:

```text
suporte_tecnico
```

Tabelas principais:

* usuarios
* chamados

A tabela `chamados` possui relacionamento com a tabela `usuarios` por meio do campo `usuario_id`.

O campo `email` da tabela `usuarios` é único.

## Configuração do banco

O banco utilizado é o MySQL.

Crie o banco de dados:

```sql
CREATE DATABASE suporte_tecnico;
```

Depois execute os comandos SQL utilizados para criação das tabelas.

As informações de conexão são configuradas no arquivo `.env`.

Exemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=suporte_tecnico
PORT=3000
JWT_SECRET=sua_chave_secreta
```

O arquivo `.env` não deve ser publicado no GitHub.

## Como executar o backend

Abra o terminal na pasta `backend`:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Execute o servidor:

```bash
npm run dev
```

O backend será executado em:

```text
http://localhost:3000
```

## Como executar o frontend

Abra:

```text
frontend/pages/login.html
```

utilizando o Live Server ou outro servidor HTTP local.

O frontend realiza as requisições para a API REST:

```text
http://localhost:3000
```

## Login

### POST /login

Realiza a autenticação do usuário.

Exemplo:

```json
{
  "email": "admin@email.com",
  "senha": "123456"
}
```

A autenticação é realizada pelo backend utilizando os dados armazenados no banco de dados.

## Endpoints da API

### Usuários

| Método | Endpoint    | Função            |
| ------ | ----------- | ----------------- |
| POST   | `/usuarios` | Cadastrar usuário |
| GET    | `/usuarios` | Listar usuários   |

### Chamados

| Método | Endpoint        | Função            |
| ------ | --------------- | ----------------- |
| GET    | `/chamados`     | Listar chamados   |
| GET    | `/chamados/:id` | Consultar chamado |
| POST   | `/chamados`     | Cadastrar chamado |
| PUT    | `/chamados/:id` | Atualizar chamado |
| DELETE | `/chamados/:id` | Excluir chamado   |

### Filtros

Filtrar por status:

```text
GET /chamados?status=aberto
```

Filtrar por prioridade:

```text
GET /chamados?prioridade=alta
```

## Funcionalidades

* Cadastro de usuários
* Login com autenticação
* Dashboard
* Cadastro de chamados
* Listagem de chamados
* Consulta de chamado
* Atualização de status
* Atualização de prioridade
* Filtro por status
* Filtro por prioridade
* Exclusão de chamados
* Confirmação antes da exclusão
* Validação dos dados
* Tratamento de erros
* Persistência dos dados no MySQL

## Fluxo da aplicação

```text
USUÁRIO
   ↓
FRONTEND
   ↓
API REST
   ↓
BACKEND
   ↓
BANCO DE DADOS MYSQL
   ↓
BACKEND
   ↓
API REST
   ↓
FRONTEND
```

## Testes

A API foi testada utilizando o Postman.

Foram realizados testes utilizando:

* GET
* POST
* PUT
* DELETE

Também foram testados:

* Login
* Cadastro de usuário
* Cadastro de chamado
* Consulta de chamados
* Filtros
* Atualização
* Exclusão
* Validações
* Tratamento de erros

## Integração

O frontend realiza as requisições exclusivamente por meio da API REST.

O backend é responsável por receber as requisições, validar os dados, executar as operações no banco de dados e retornar as respostas em formato JSON.

Dessa forma, o fluxo da aplicação é:

```text
Frontend
   ↓
API REST
   ↓
Backend
   ↓
MySQL
```

## Evidências

As evidências dos testes e da integração da aplicação estão armazenadas na pasta:

```text
evidencias/
```

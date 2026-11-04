# A Caixa de Morfeu | Back-end

API responsável pela autenticação de usuários e pelo gerenciamento dos sonhos registrados na aplicação **A Caixa de Morfeu**.

O back-end foi desenvolvido como parte de um projeto full-stack, com uma API própria para persistência de dados e integração com o front-end em React.

## Funcionalidades

- Cadastro de usuários
- Login e autenticação por token JWT
- Consulta dos dados do usuário autenticado
- Registro de sonhos associados ao usuário
- Listagem dos sonhos registrados pelo usuário autenticado
- Exclusão de sonhos
- Validação de dados e tratamento centralizado de erros
- Registro de requisições e erros por meio de logs

## Tecnologias

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs para hash de senhas
- Celebrate para validação de requisições
- Winston para logs
- CORS para controle de acesso entre origens

## Arquitetura

O back-end recebe as requisições do front-end, valida os dados recebidos, autentica os usuários quando necessário e consulta ou modifica os dados armazenados no MongoDB.

As senhas são armazenadas por meio de hash e as rotas protegidas exigem autenticação por token.

### Registro de um sonho

O registro utiliza informações como data, descrição, símbolo associado e indicação de recorrência.

Os sonhos devem ser associados ao usuário autenticado, de modo que cada pessoa acesse seus próprios registros.

## Como executar o projeto

### Pré-requisitos

- Node.js
- npm
- MongoDB
- Git

### Instalação

Clone o repositório e acesse a pasta:

git clone https://github.com/ElisaRoque/caixa-de-morfeu-backend
cd caixa-de-morfeu-backend
npm install

### Executar em desenvolvimento

Com o MongoDB em execução e as variáveis configuradas:
npm run dev

Para iniciar o servidor sem o Nodemon:
npm start

O servidor utiliza a porta `3001` por padrão, salvo configuração diferente no ambiente.

## Integração com o front-end

Repositório do front-end: [caixa-de-morfeu-frontend](https://github.com/ElisaRoque/caixa-de-morfeu-frontend)

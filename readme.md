# Sistema de Pesquisa de Mercado via WhatsApp

Este projeto é um sistema completo de pesquisa de mercado que integra o envio de mensagens via **WhatsApp**, um **frontend em React** para coleta de respostas e um **backend em Express** seguindo os princípios da **Clean Architecture**. O sistema permite enviar convites personalizados para os alunos participarem de uma pesquisa, coletar suas respostas e enviar mensagens de agradecimento automaticamente.

## Índice

- [Visão Geral](#visão-geral)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Uso](#uso)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Visão Geral

O sistema permite:

- **Enviar mensagens via WhatsApp** para alunos cadastrados, contendo links únicos para o questionário.
- **Capturar respostas** dos alunos através de um questionário online em React.
- **Processar e armazenar as respostas** no backend.
- **Enviar mensagens de agradecimento** automaticamente após a submissão do questionário.
- **Garantir segurança e integridade** através de tokens únicos e validação de assinaturas.

## Arquitetura do Projeto

![Arquitetura do Projeto](./docs/arquitetura.png)

1. **WhatsApp API**: Envia mensagens com links únicos para os alunos.
2. **Frontend em React**: Apresenta o questionário e captura as respostas.
3. **Backend em Express**: Processa as respostas e gerencia a lógica do aplicativo.
4. **Banco de Dados MongoDB**: Armazena dados dos alunos e respostas.
5. **Webhook**: Recebe eventos do WhatsApp e verifica a autenticidade das solicitações.

## Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB com Mongoose
  - Axios
- **Frontend**:
  - React.js
  - Axios
- **Outras**:
  - WhatsApp Business Cloud API
  - Dotenv para gerenciamento de variáveis de ambiente

## Pré-requisitos

- **Node.js** instalado (versão 14 ou superior)
- **npm** ou **yarn**
- **MongoDB** instalado ou acesso a um servidor MongoDB
- **Conta no Facebook Developer** com acesso à WhatsApp Business API

## Instalação

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### Configuração do Backend

#### Navegue para a pasta do backend

```bash
cd backend
```

#### Instale as dependências

```bash
npm install
```

### Configuração do Frontend

#### Navegue para a pasta do frontend

```bash
cd ../frontend
```

#### Instale as dependências

```bash
npm install
```

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:

```dotenv
PORT=3000
VERIFY_TOKEN=SEU_TOKEN_DE_VERIFICACAO
ACCESS_TOKEN=SEU_ACCESS_TOKEN
PHONE_NUMBER_ID=SEU_PHONE_NUMBER_ID
APP_SECRET=SEU_APP_SECRET
MONGODB_URI=mongodb://localhost:27017/surveydb
```

- **PORT**: Porta em que o servidor backend irá rodar.
- **VERIFY_TOKEN**: Token para verificação do webhook do WhatsApp.
- **ACCESS_TOKEN**: Token de acesso à API do WhatsApp.
- **PHONE_NUMBER_ID**: ID do número de telefone configurado no WhatsApp Business API.
- **APP_SECRET**: Chave secreta do aplicativo do Facebook Developer.
- **MONGODB_URI**: URI de conexão com o MongoDB.

### Configuração do WhatsApp Business API

1. **Crie um aplicativo no Facebook Developer** e adicione o produto WhatsApp.
2. **Obtenha o ACCESS_TOKEN, PHONE_NUMBER_ID e APP_SECRET** nas configurações do aplicativo.
3. **Configure o Webhook** no Facebook Developer:
   - URL do webhook: `https://seu-dominio.com/webhook`
   - Token de verificação: mesmo valor de `VERIFY_TOKEN` no `.env`.

## Execução

### Iniciando o Backend

1. **Navegue para a pasta do backend**:

   ```bash
   cd backend
   ```

2. **Inicie o servidor**:

   ```bash
   npm start
   ```

   O servidor estará rodando em `http://localhost:3000`.

### Iniciando o Frontend

1. **Navegue para a pasta do frontend**:

   ```bash
   cd ../frontend
   ```

2. **Inicie o aplicativo React**:

   ```bash
   npm start
   ```

   O aplicativo estará disponível em `http://localhost:3001`.

### Nota

- **Proxy**: O frontend está configurado para proxy as requisições para o backend na porta `3000`.
- **Ambiente de Produção**: Em produção, o backend pode servir os arquivos estáticos do frontend.

## Uso

### 1. Cadastro de Alunos

Cadastre os alunos no banco de dados com nome, número de telefone e token vazio. Você pode utilizar ferramentas como **MongoDB Compass** ou criar um script de seed.

### 2. Envio de Links Únicos

Execute o script para gerar tokens únicos e enviar os links do questionário via WhatsApp:

```bash
node scripts/sendSurveyLinks.js
```

### 3. Resposta ao Questionário

- Os alunos recebem a mensagem via WhatsApp com o link único.
- Ao clicar no link, são direcionados ao questionário em React.
- Preenchem as respostas e submetem o formulário.

### 4. Processamento das Respostas

- O backend recebe as respostas, valida o token e armazena as informações no banco de dados.
- O token é invalidado para evitar múltiplas submissões.

### 5. Mensagem de Agradecimento

- Após o processamento, o backend envia uma mensagem de agradecimento ao aluno via WhatsApp.

## Estrutura de Pastas

```
project-root/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   ├── presentation/
│   │   └── application/
│   ├── scripts/
│   ├── .env
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env (se necessário)
└── README.md
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

Para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Comite suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contato

- **Nome**: Seu Nome
- **Email**: seuemail@exemplo.com
- **LinkedIn**: [Seu Perfil](https://www.linkedin.com/in/seu-perfil)

---

**Notas Finais**:

- Certifique-se de substituir os espaços reservados (`SEU_TOKEN_DE_VERIFICACAO`, `SEU_ACCESS_TOKEN`, etc.) pelos valores reais obtidos nas configurações do Facebook Developer.
- Mantenha suas chaves e tokens em segurança e nunca os exponha em repositórios públicos.
- Para ambiente de produção, considere práticas de segurança adicionais, como certificados SSL válidos, autenticação reforçada e monitoramento de logs.

# Configuração de Usuário no MongoDB para o Projeto

Este guia detalha os passos para configurar um usuário no banco de dados MongoDB, caso precise criar um novo banco e configurar um usuário para acesso no futuro.

### 1. Acessar o MongoDB

- Se o MongoDB estiver rodando localmente, digite no terminal:
  ```sh
  mongo
  ```

- Se o MongoDB estiver rodando em um contêiner Docker, use:
  ```sh
  docker exec -it mongodb-container-name mongo
  ```
  Onde `mongodb-container-name` é o nome do contêiner onde o MongoDB está rodando.

### 2. Criar o Usuário no Banco de Dados

- Dentro do shell do MongoDB, selecione o banco de dados desejado e crie o usuário com o seguinte comando:
  ```javascript
  use surveydb
  db.createUser({
    user: "meuUsuario",
    pwd: "minhaSenha",
    roles: [{ role: "readWrite", db: "surveydb" }]
  })
  ```

### 3. Atualizar String de Conexão no .env

- Após criar o usuário, atualize a string de conexão no arquivo `.env`:
  ```plaintext
  MONGODB_URI=mongodb://meuUsuario:minhaSenha@localhost:27017/surveydb
  ```

### 4. Configurar a Autenticação no MongoDB

- Certifique-se de que a autenticação esteja habilitada no MongoDB. No arquivo de configuração `mongod.conf`, adicione ou edite a seguinte configuração:
  ```yaml
  security:
    authorization: "enabled"
  ```

- Reinicie o MongoDB para aplicar as mudanças.

### Observação
Certifique-se de que o MongoDB esteja em execução e que o contêiner Docker esteja configurado corretamente, caso esteja usando Docker, para evitar problemas de conexão.

dentro do DOCKER node /usr/src/app/src/infrastructure/database/populateStudents.js 
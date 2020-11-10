# Backend Compasso UOL

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b064b4ba1ba086f1a1c3)

Esse repositório contém o código do backend para o desafio do Compasso UOL.
Foi utilizado o Node.js, Express e MongoDB.

## Requerimentos

- Docker;
- Docker Compose.

## Bibliotecas usadas

| Nome do pacote                                                                               |                                          Descrição                                          |
| -------------------------------------------------------------------------------------------- | :-----------------------------------------------------------------------------------------: |
| [cors](https://www.npmjs.com/package/cors)                                                   |                               Pacote usado para tratar o CORS                               |
| [date-fns](https://www.npmjs.com/package/date-fns)                                               |                   Biblioteca para manipulação de datas                 |
| [dotenv-flow](https://www.npmjs.com/package/dotenv-flow)                                               |                   Carrega variáveis de ambiente a partir de arquivos .env                   |
| [express](https://www.npmjs.com/package/express)                                             |                      Framework web usado para construção de APIs REST                       |
| [express-async-errors](https://www.npmjs.com/package/express-async-errors)                   | Adiciona suporte para tratamento de erros quando utiliza-se async/await em rotas do Express |
| [express-validator](https://www.npmjs.com/package/express-validator)                         |                       Validação de dados dos _requests_ com o Express                       |
| [helmet](https://www.npmjs.com/package/helmet)                                               |   Seta headers de segurança para tratar alguns problemas conhecidos como por exemplo XSS.   |
| [morgan](https://www.npmjs.com/package/morgan)                                               |                 Middleware que faz o log de cada _request_ feito ao express                 |
| [mongoose](https://www.npmjs.com/package/mongoose) |                       ODM para o MongoDB                        |
| [serialize-error](https://www.npmjs.com/package/serialize-error)                             |                          Serializa e desserializa erros em objetos                          |


_Dependências de Desenvolvimento:_

- Usadas para verificar a sintaxe e formatação em relação a um _style guide_:

```
    eslint, eslint-config-standard, eslint-plugin-import, eslint-plugin-node, eslint-plugin-promise, eslint-plugin-standard
```

- Framework de testes para o Node.js:

```
    jest
```

- Monitora mudanças em seu app e reinicia automaticamente

```
    nodemon
```

- MongoDB na memória utilizado na execução da suíte de testes:

```
   mongodb-memory-server
```

- Usado para realizar requisições a API durante os testes:

```
    supertest
```

## Como rodar?

1. Você deve estar na pasta do projeto.

2. Copie o arquivo de exemplo das variáveis de ambiente e edite se necessário.

```
    cp .env.example .env
```

3. Inicialize o docker-compose:

```
  docker-compose up --build
```

4. Nas próximas execuções somente é necessário rodar:

```
  docker-compose up
```

Obs.: No primeiro uso é normal demorar, pois é feito o download das imagens necessárias e o container é configurado.

5. Para parar a execução da API, pressione CTRL+C ou CTRL+D.

6. Para rodar os testes use:

```
  docker exec -it backend-compasso-uol npm run test
```

_Atenção_: Para rodar o comando acima é necessário que os containers estejam rodando (passo 4)

## Endpoints da API

Os _endpoints_ desta API estão documentados abaixo.

### Cadastrar cidade

**URL**

- /cities

**Método HTTP:**

- POST

**Parâmetros de Query:**

nenhum

**Parâmetros no Header:**

Nenhum

**Parâmetros no Body**

- **name**: Nome da cidade;
- **state**: Estado.

**Respostas**

Código: 201 OK
Conteúdo de retorno: Cidade criada

**Exemplo de chamada**

```bash
  curl -d '{"name": "Rio Negrinho", "state": "SC"}' -H "Content-Type: application/json" -X POST http://localhost:8000/cities
```

Resultado:

```json
{
  "_id": "5fab183759829c055e175658",
  "name": "Rio Negrinho",
  "state": "SC",
  "__v": 0
}
```

### Cadastrar cliente

**URL**

- /customers

**Método HTTP:**

- POST

**Parâmetros de Query:**

nenhum

**Parâmetros no Header:**

Nenhum

**Parâmetros no Body**

- **fullname**: Nome do cliente;
- **gender**: Sexo;
- **birthDate**: Data de nascimento (YYYY-MM-DD);
- **cityId**: Id da cidade.

**Respostas**

Código: 201 OK
Conteúdo de retorno: Cliente criado

**Exemplo de chamada**

```bash
  curl -d '{"fullname": "Roberto", "gender": "M", "birthDate": "1970-01-21", "cityId": "5faaf40c8d754a0031b7e90e"}' -H "Content-Type: application/json" -X POST http://localhost:8000/customers
```

Resultado:

```json
{
  "_id":"5fab1ab959829c055e175659",
  "fullname":"Roberto",
  "gender":"M",
  "birthDate":"1970-01-21T00:00:00.000Z",
  "city":"5faaf40c8d754a0031b7e90e",
  "__v":0,
  "age":50,
  "id":"5fab1ab959829c055e175659"
}
```

### Consultar cidade pelo nome

**URL**

- /cities

**Método HTTP:**

- GET

**Parâmetros de Query:**

- name: nome da cidade

**Parâmetros no Header:**

Nenhum

**Respostas**

Código: 200 OK
Conteúdo de retorno: Dados das cidades

**Exemplo de chamada**

```bash
    curl http://localhost:8000/cities?name=Joinville
```

Resultado:

```json
[
    {
        "_id": "5faabb2d83ac8d002a7bdf1f",
        "name": "Joinville",
        "state": "SC",
        "__v": 0
    }
]
```

### Consultar cidade pelo estado

**URL**

- /cities

**Método HTTP:**

- GET

**Parâmetros de Query:**

- state: nome do estado

**Parâmetros no Header:**

Nenhum

**Parâmetros no Body**

- **name**: Nome da cidade;

**Respostas**

Código: 200 OK
Conteúdo de retorno: Dados das cidades por estado

**Exemplo de chamada**

```bash
    curl http://localhost:8000/cities?state=SC
```

Resultado:

```json
[
    {
        "_id": "5faabb2d83ac8d002a7bdf1f",
        "name": "Joinville",
        "state": "SC",
        "__v": 0
    }
]
```

### Consultar cliente pelo nome

**URL**

- /customers

**Método HTTP:**

- GET

**Parâmetros de Query:**

- fullname: Nome do cliente

**Parâmetros no Path:**

Nenhum

**Parâmetros no Header:**

Nenhum

**Respostas**

Código: 200 OK
Conteúdo de retorno: Dados dos clientes

**Exemplo de chamada**

```bash
  curl http://localhost:8000/customers?fullname=Luis
```

Resultado:

```json
[
  {
    "_id":"5faaf8cdccd502018938c041",
    "fullname":"Luis F.",
    "gender":"M",
    "birthDate":"1993-08-26T00:00:00.000Z",
    "city":{"_id":"5faaf40c8d754a0031b7e90e",
    "name":"Florianópolis"},
    "__v":0,
    "age":27,
    "id":"5faaf8cdccd502018938c041"
  }
]
```

### Consultar cliente pelo Id

**URL**

- /customers/:id

**Método HTTP:**

- GET

**Parâmetros no Path:**

- id: id do cliente

**Parâmetros no Header:**

Nenhum

**Respostas**

Código: 200 OK
Conteúdo de retorno: Dados do cliente

Código: 404 Not Found
Conteúdo de retorno: Cliente não foi encontrado

**Exemplo de chamada**

```bash
  curl http://localhost:8000/customers/5faaf8cdccd502018938c041
```

Resultado:

```json
{
  "_id":"5faaf8cdccd502018938c041",
  "fullname":"Luis F.",
  "gender":"M",
  "birthDate":"1993-08-26T00:00:00.000Z",
  "city":{"_id":"5faaf40c8d754a0031b7e90e",
  "name":"Florianópolis"},
  "__v":0,
  "age":27,
  "id":"5faaf8cdccd502018938c041"
}
```


### Remover cliente

**URL**

- /customers/:id

**Método HTTP:**

- DELETE

**Parâmetros no Path:**

- id: id do cliente

**Parâmetros no Header:**

Nenhum

**Respostas**

Código: 204 No Content
Conteúdo de retorno: Cliente removido

Código: 404 Not Found
Conteúdo de retorno: Cliente não foi encontrado

**Exemplo de chamada**

```bash
    curl -X DELETE http://localhost:8000/customers/5faaf456255540004eef64ac
```

Resultado:

```json
```

### Alterar o nome do cliente

**URL**

- /customers/:id

**Método HTTP:**

- PUT

**Parâmetros no Path:**

- id: id do cliente

**Parâmetros no Header:**

Nenhum

**Parâmetros no Body**

- **fullname**: Novo nome do cliente;

**Respostas**

Código: 200 OK
Conteúdo de retorno: Dados atualizados do cliente

Código: 404 Not Found
Conteúdo de retorno: Cliente não foi encontrado

**Exemplo de chamada**

```bash
    curl -d '{"fullname": "Luis F."}' -H "Content-Type: application/json" -X PUT http://localhost:8000/customers/5faaf8cdccd502018938c041
```

Resultado:

```json
{
    "_id": "5faaf8cdccd502018938c041",
    "fullname": "Luís F. Bilecki",
    "gender": "M",
    "birthDate": "1993-08-26T00:00:00.000Z",
    "city": "5faaf40c8d754a0031b7e90e",
    "__v": 0,
    "age": 27,
    "id": "5faaf8cdccd502018938c041"
}
```

## Comentários sobre decisões e ideias de trabalhos futuros

- Utilizar o Swagger para documentar a API e fornecer um acesso a documentação;
- Uma sugestão seria implementar um esquema de _cache_ dos dados utilizados com mais frequência. Para isto pode-se utilizar o [Redis](https://redis.io/);
- Optei por utilizar o MongoDB como Banco de Dados NoSQL para armazenar os dados. Uma outra sugestão seria utilizar um banco de dados relacional como o Postgres ou MySQL.

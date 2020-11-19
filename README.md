# INFOS SOBRE API REST

## 1. API
Você está em um restaurante:
* Cliente - Client 
* Garçon - API (pedidos, levar/trazer pedidos para a cozinha)
* Cozinha - Servidor (recebe os dados)

#
## 2. REST
Boas práticas (Determina obrigações nessa transferência de informações);
* Protocolo HTTP;
* Dados Recebidos/Enviados (chamados de Resources);
* Resources seria então uma entidade, um objeto.

#
## 3. Verbos HTTP
* GET: Recebe dados de um Resource.
* POST: Enviar dados ou informações para serem processados por um Resource.
* PUT: Atualizar dados de um Resource.
* DELETE: Deletar um Resource.

#
## 3. Status das respostas
#### 1xx: Informação
* Retornos de informação

#### 2xx: Status Sucesso
* 200 - OK
* 201 - CREATED
* 204 - NO CONTENT (A ROTA EXISTE, MAS NÃO EXISTE POST, PUT OU DELETE)

#### 3xx: Status Redirection

#### 4xx: Status Client Error
* 400 - BAD REQUEST
* 404 - NOT FOUND (ROTA NÃO ENCONTRADA)

#### 5xx: Status Server Error
* 500 - INTERNAL SERVER ERROR (ERRO NO SERVIDOR)

#
# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

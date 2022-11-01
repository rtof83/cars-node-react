# Projeto Catálogo de Carros

## Foi utilizado para contrução:
- API -> Node.js;
- FRONT -> React;
- DB -> MySQL;
- Ferramentas:
    - Visual Studio Code 1.72.2;
    - HeidiSQL 12.1.0;
    - Console de Gerenciamento da AWS;

&nbsp;

## Estrutura da base de dados:

- Carro (Car):
```javascript
    id: Integer,
    brandId: Integer,
    storeId: Integer,
    name: String,
    model: Integer,
    price: Decimal,
    km: Integer,
    desc: String,
    image: String
```

- Marca (Brand):
```javascript
    id: Integer,
    name: String
```

- Loja (Store):
```javascript
    id: Integer,
    name: String
```

- Usuário (User):
```javascript
    id: Integer,
    name: String,
    password: String,
    email: String,
    access: String
```

&nbsp;

## Instalação
- /web e /api -> npm i;

&nbsp;

## Inicialização
- [CREATE DATABASE database](https://github.com/rtof83/cars-node-react/blob/main/samples/database.sql)
- /web e /api -> npm start;
- porta padrão API: ([configuração inicial .env](https://github.com/rtof83/cars-node-react/blob/main/api/.env.example));
- porta padrão WEB: 3000;
- usuário padrão: ``` { user: admin, password: admin } ```;

&nbsp;

## Configurações
- [API - conexão com a base de dados](https://github.com/rtof83/cars-node-react/blob/main/api/database/conn.js);
- [FRONT - conexão com a API](https://github.com/rtof83/cars-node-react/blob/main/web/src/api.js);
- [ENV - arquivo de configuração inicial](https://github.com/rtof83/cars-node-react/blob/main/api/.env.example) (deve ser renomeado para .env):
    - exemplo de configuração:

    ```javascript
        APP_PORT = 3002 -> porta de acesso da API

        DB_NAME = database
        DB_USER = user_db
        DB_PASS = pass_dn

        DB_DIALECT = mysql
        DB_HOST = localhost
        DB_PORT = 3306

        SECRET = secret_word -> variável utilizada para gerar a assinatura JWT
        SECRET_TIMEOUT = 60000 -> (10 minutos) -> tempo de expiração da assinatura

        PAGE_SIZE = 10 -> número de registros por páginas 
    ```

&nbsp;

### a aplicação pode ser acessada através do link:
- http://car-catalog-node-mysql.s3-website-us-east-1.amazonaws.com
- FRONT armazenado em instância Amazon S3;
- API instanciada em EC2 AWS (http://18.234.224.108:3002);
- Base de Dados instanciada em RDS (database.c4gffxjofhme.us-east-1.rds.amazonaws.com:3306);

&nbsp;

### Implementações API:
- [Collections Postman](https://github.com/rtof83/cars-node-react/blob/main/samples/car-catalog.postman_collection.json);

- Utilização de [models Sequelize](https://github.com/rtof83/cars-node-react/tree/main/api/models);

- Autenticação via Bearer Authentication (JWT);

&nbsp;

- Rotas de acesso:

    - POST (rotas principais)
        - {baseURL}/brands -> cadastra marca;
        - {baseURL}/store -> cadastra loja;
        - {baseURL}/cars -> cadastra carro;
        - {baseURL}/users -> cadastra usuário;

    &nbsp;

    - POST (rotas secundárias)
        - {baseURL}/login -> verifica se usuário e senha são válidos, retornando: autorização, id, nome, tipo de acesso e token:

            - exemplo de entrada:

            ```javascript
            {
                "name": "username",
                "password": "password",
            }
            ```

            - exemplo de saída:

            ```javascript
            {
                "auth": true,
                "id": 1,
                "name": "admin",
                "access": "admin",
                "token": "xxxxxxxxxxxxxxxx"
            }
            ```

        &nbsp;

        - {baseURL}/validate -> verifica se o token informado (via cabeçalho) é válido:

            - exemplo de saída:

            ```javascript
            {
                "id": 1,
                "access": "admin",
                "iat": 1667249381,
                "exp": 1667249981
            }
            ```


    &nbsp;

    - GET
        - {baseURL}/{route} -> retorna todos os registros;
        - {baseURL}/{route}/{id} -> retorna registro por id;
        - {baseURL}/{route}?page={page} -> retorna registros por página;
        - {baseURL}/{route}?name={name} -> retorna registros por nome;
        - {baseURL}/{route}?page={page}&name={name} -> retorna registros por nome e página;

    &nbsp;

    - PUT
        - {baseURL}/{route}/{id} -> atualiza registro;

    &nbsp;

    - DELETE
        - {baseURL}/{route}/{id} -> exclui registro;

&nbsp;

- Middlewares:
    - [checkRoute](https://github.com/rtof83/cars-node-react/blob/main/api/middlewares/checkRoute.js):
        - recebe token via cabeçalho, verifica se a rota é pública ou privada e garante acesso;

    - [checkUser](https://github.com/rtof83/cars-node-react/blob/main/api/middlewares/checkUser.js):
        - recebe token via cabeçalho;
        - Usuário com grupo de acesso 'admin' possui acesso a todos os recursos;
        - Usuário com grupo de acesso 'user' possui acesso somente a listagens (este usuário visualiza e altera apenas suas informações (rota /users));

    - [checkAdminExists](https://github.com/rtof83/cars-node-react/blob/main/api/middlewares/checkAdminExists.js):
        - garante a criação de um usuário padrão admin na primeira execução com a base de dados;

    - [checkAdminDel](https://github.com/rtof83/cars-node-react/blob/main/api/middlewares/checkAdminDel.js):
        - garante a manutenção de pelo menos um usuário admin ao excluir usuários;
    
    - [validate](https://github.com/rtof83/cars-node-react/blob/main/api/middlewares/validate.js):
        - criação de assinatura JWT;

- Paginação:
    - retorna número de registros por página ([configuração inicial .env](https://github.com/rtof83/cars-node-react/blob/main/api/.env.example));

- Buscas:
    - localização por id ou nome em Carros, Marcas, Lojas e Usuários;

&nbsp;

#### exemplo de inserção e alteração de Carro

```javascript
{
    "name": "Car Name",
    "model": "2000",
    "price": 50000,
    "km": 10000,
    "image": "https://image.com/01.jpg"
    "desc": "car description",
    "brandId": 1,
    "storeId": 1
}
```

#### exemplo de inserção e alteração de Marca

```javascript
{
    "name": "Brand 01",
}
```

#### exemplo de inserção e alteração de Loja

```javascript
{
    "name": "Store 01",
}
```

#### exemplo de inserção e alteração de Usuário

```javascript
{
    "name": "user",
    "password": "123",
    "email": "user@system.com",
    "access": "admin"
}
```

&nbsp;

### Implementações:
- Cadastro, alteração e exclusão de Carros;
- Cadastro, alteração e exclusão de Marcas;
- Cadastro, alteração e exclusão de Lojas;
- Cadastro, alteração e exclusão de Usuários;
- Lista Carros;
- Lista Marcas;
- Lista Lojas;
- Lista Usuários;
- Login;

&nbsp;

### Próximos passos:
- Paginação na home;
- Página detalhada sobre o Carro selecionado;
- Senha criptografada na base de dados;

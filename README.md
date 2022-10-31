# Projeto Catálogo de Carros

## Foi utilizado para contrução:
- API -> Node.js;
- FRONT -> React;
- DB -> MySQL;
- Ferramentas:
    - Visual Studio Code 1.72.2;
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
    birth: Date
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

- Usuário (user):
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
- /web e /api -> npm start;
- porta padrão API: 3001;
- porta padrão WEB: 3000;

&nbsp;

## Configurações
- [API - conexão com a base de dados](https://github.com/rtof83/cars-node-react/blob/main/api/database/conn.js);
- [FRONT - conexão com a API](https://github.com/rtof83/cars-node-react/blob/main/web/src/api.js);

&nbsp;

### a aplicação pode ser acessada através do link:
- http://car-catalog-node-mysql.s3-website-us-east-1.amazonaws.com
- FRONT armazenado em instância Amazon S3;
- API instanciado em EC2 AWS (http://18.234.224.108:3002);
- Base de Dados instanciado em RDS (database.c4gffxjofhme.us-east-1.rds.amazonaws.com:3306);

&nbsp;

### Implementações API:
- [Collections Postman](https://github.com/rtof83/cars-node-react/blob/main/samples/car-catalog.postman_collection.json);

- Utilização de [models Sequelize](https://github.com/rtof83/cars-node-react/tree/main/api/models);

&nbsp;

- Rotas de acesso:

    - POST
        - {baseURL}/customers/getUser -> retorna cliente por email e senha;
        - {baseURL}/customers -> cadastra cliente;
        - {baseURL}/products -> cadastra produto;
        - {baseURL}/orders -> cadastra pedido;

    - GET
        - {baseURL}/customers -> retorna todos os clientes;
        - {baseURL}/customers/{id} -> retorna cliente por id;
        - {baseURL}/customers?page={page} -> retorna clientes por página;
        - {baseURL}/customers?name={name} -> retorna clientes por nome;
        - {baseURL}/customers?page={page}&name={name} -> retorna clientes por nome e página;

        - {baseURL}/products -> retorna todos os produtos;
        - {baseURL}/products/{id} -> retorna produto por id;
        - {baseURL}/products?page={page} -> retorna produtos por página;
        - {baseURL}/products?name={name} -> retorna produtos por nome;
        - {baseURL}/products?page={page}&name={name} -> retorna produtos por nome e página;

        - {baseURL}/orders -> retorna todos os pedidos;
        - {baseURL}/orders/{id} -> retorna pedido por id;
        - {baseURL}/orders?page={page} -> retorna pedidos por página;
        - {baseURL}/orders?page={page}&customer={customer} -> retorna pedidos por cliente e página;

    - PATCH
        - {baseURL}/customers/{id} -> atualiza cliente;
        - {baseURL}/products/{id} -> atualiza produto;

    - DELETE
        - {baseURL}/customers/{id} -> exclui cliente;
        - {baseURL}/products/{id} -> exclui produto;
        - {baseURL}/orders/{id} -> atualiza pedido;

- Middlewares:
    - [checkEmail](https://github.com/rtof83/ecommerce-node-react/blob/main/api/middlewares/checkEmail.js) -> verifica se há um email existente ao tentar cadastrar novo Cliente;

- Buscas:
    - retorna até 10 registros por página;

- Inserção de pedidos:
    - o total do pedido e a data e hora atual são inseridos através da API;
    - a quantidade de produtos é atualizada de forma automatizada (é verificado se a quantidade solicitada é igual ou menor que o estoque);

&nbsp;

#### exemplo de inserção e alteração de Cliente

```javascript
{
    "name": "Test Client",
    "cpf": "99999999999",
    "email": "client@test.com",
    "address": "Client Address, 95",
    "phone": "(99) 99999-9999",
    "birth": "1999-01-01",
    "password": "pass"
}
```

#### exemplo de inserção e alteração de Produto

```javascript
{
    "sku": "888",
    "name": "Product Test",
    "price": 99.9,
    "quantity": 30,
    "desc": "description",
    "image": "https://image.com/image.jpg"
}
```

#### exemplo de inserção de Pedido

```javascript
{
    "customer": "ObjectId",
    "address": "Payment Street",
    "payment": "pix",
    "items": [{
                "sku": "888"
                "quantity": 2,
              },
              {
                 "sku": "999ab"
                 "quantity": 2,
              }]
}
```

&nbsp;

### Implementações:
- Cadastro, alteração e exclusão de Clientes;
- Cadastro, alteração e exclusão de Produtos;
- Lista Clientes;
- Lista Produtos;
- Lista Pedidos;
- Carrinho;
- Login;

&nbsp;

### Próximos passos:
- Utilizar localstorage (pedidos) concomitante ao ContextAPI;
- Lista de pedidos detalhada;
- Componentização das rotas;
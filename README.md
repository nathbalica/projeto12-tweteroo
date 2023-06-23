# projeto12-tweteroo

## Sobre
API do Tweteroo, um clone do Twitter!

## Tecnologias 🚀

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Nodejs](https://nodejs.org/)
- [express](https://expressjs.com/)
- [javascript](https://www.javascript.com/)

## Rotas 🛣️

#### <span style="color: orange;">POST</span> <span style="color: red;">/sign-up</span>
- Recebe (pelo `body` da request), um parâmetro **username** e um **avatar**, contendo o nome do username do usuário e a sua foto de avatar:

```json
{
    "username": "bobesponja",
    "avatar": "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png"
}

```

- Se os valores de username e avatar não tiverem sido enviados e não são strings. Responde com a mensagem “Todos os campos são obrigatórios!”.

#### <span style="color: orange;">POST</span> <span style="color: red;">/tweets</span>

- Se o usuário não estiver cadastrado (username não fez `sign-up` anteriormente), retorna a mensagem <span style="color: red;">“UNAUTHORIZED”</span>.
- Recebe (pelo body da request), os parâmetros `username` e `tweet`.

```json
{
    "username": "bobesponja",
    "tweet": "Eu amo hambúrguer de siri!"
}

```
- Esse endpoint recebe o valor de username por meio de um header user. 

- Se os valores de username e avatar não tiverem sido enviados e não são strings. Responde com a mensagem “Todos os campos são obrigatórios!”.

#### <span style="color: green;">GET</span> <span style="color: red;">/tweets</span>

- Retorna os 10 últimos tweets publicados

```json
[
	{
		"username": "bobesponja",
		"avatar": "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
		"tweet": "Eu amo hambúrguer de siri!"
	}
]
```

- Esse endpoint recebe uma página identificada via query string, no formato `?page=1`.
- O endpoint retorna corretamente os tweets da “página” (page) atual, esse endpoint é chamado ao clicar no botão “Carregar mais”.
- A primeira página corresponde aos últimos 10 tweets, a segunda do 11 ao 20, a terceira do 21 ao 30, etc.
- Caso o valor de page não seja um número maior que 1, responderá com a mensagem “Informe uma página válida!” e com o status code 400 (BAD REQUEST).
- O parâmetro page continua opcional. Caso não seja enviado, retorna os últimos 10 tweets.

#### <span style="color: green;">GET</span> <span style="color: red;">/tweets/USERNAME</span>

- Retorna todos os tweets publicados do usuário recebido por parâmetro de rota em um array no formato abaixo:

```json
[
	{
        "username": "bobesponja",
        "avatar": "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
        "tweet": "Eu amo hambúrguer de siri!"
	},
	{
        "username": "bobesponja",
        "avatar": "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
        "tweet": "Eu sou amigo do Patrick, ele é uma estrela!"
	}
]
```

- Se não houver nenhum tweet deste usuário, retorna um array vazio.

## Status codes de requisições <span style="color: orange;">POST</span>

- Todas as requisições **POST** retornaM o status code 201 (CREATED) além do retorno (mensagem de `“OK”`).
- [ ]  Para os casos em que o usuário tenta enviar um tweet na rota **POST** `/tweets` sem antes ter feito login na rota **POST** `/sign-up`, retorna 401 (UNAUTHORIZED).















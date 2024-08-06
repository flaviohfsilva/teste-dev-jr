
[![Logo](logo.png)](www.cloudged.com.br)

<h1 style="text-align: center;">Desafio - Desenvolvedor jr</h1>

## Introdução

Olá! Este desafio tem por objetivo avaliar a capacidade técnica de candidatos à vaga de desenvolvedor júnior da [CloudGed Consultoria Tributária](www.cloudged.com.br). Além disso, a avaliação consiste em analisar a capacidade de resolução de problemas e os conhecimentos técnicos específicos necessários para o cargo.

## Instruções

1.  Faça um fork deste repositório para a sua conta pessoal do GitHub.
2.  Siga as instruções do desafio.
3.  Após finalizar, faça um pull request para este repositório com a solução do desafio.
4.  Você tem até 4 dias a partir do recebimento deste teste para enviar a sua solução.

## O desafio
1.  Utilizando a linguagem de sua preferência, desenvolva um programa que extraia o conteúdo do arquivo .txt disponibilizado e que depois salve os dados extraídos em um arquivo no formato .xlsx
2.  Desenvolva uma RESTful API em Node.js para o gereciamento de um cadastro de usuários. A API deverá conter os seguintes endpoints:

    -   **GET /users**: Retorna a lista de usuários cadastrados.   
                Seu retorno deve ser no seguinte formato JSON com status code HTTP 200:
        
        ```json
        [
            {
                "id": 1,
                "nomeCompleto": "João da Silva",
                "email": "joao.silva@gmail.com"
            },
            {
                "id": 2,
                "nomeCompleto": "Maria da Silva",
                "email": "maria.silva@gmail.com"
            }
        ]
    -   **GET /users/:id**: Retorna os dados de um usuário específico.  
                Seu retorno deve ser no seguinte formato JSON com status code HTTP 200:
        
        ```json
        {
            "id": 1,
            "nomeCompleto": "João da Silva",
            "email": "joao.silva@gmail.com"
        }
    -   **POST /users**: Adiciona um novo usuário.  
                Corpo da requisição:

        ```json
        {
            "nomeCompleto": "João da Silva",
            "email": "joao.silva@gmail.com"
        }
        ```

        Seu retorno deverá ser no seguinte formato JSON com status code HTTP 201:
        
        ```json
        {
            "id": 1,
            "nomeCompleto": "João da Silva",
            "email": "joao.silva@gmail.com",
            "status": "Created"
        }
        ```

    -   **PUT /users/:id**: Atualiza os dados de um usuário específico.   
                Corpo da requisição:

        ```json
        {
            "nomeCompleto": "João Pereira da Silva",
            "email": "joao.silva@gmail.com"
        }
        ```

        Seu retorno deverá ser no seguinte formato JSON com status code HTTP 200:
        
        ```json
        {
            "id": 1,
            "nomeCompleto": "João Pereira da Silva",
            "email": "joao.silva@gmail.com",
            "status": "Updated"
        }
        ```
    -   **DELETE /users/:id**: Remove um usuário específico.   
                Seu retorno deverá ser no seguinte formato JSON com status code HTTP 200:
        
        ```json
        {
            "id": 1,
            "status": "Deleted"
        }
        ```

3. Desenvolva uma interface utilizando o framework React.js que deverá realizar a integração com a API que você desenvolveu no item 2. O layout da interface é livre, mas deverá conter as seguintes funcionalidades:
    -   Listagem de usuários cadastrados;
    -   Adição de um novo usuário;
    -   Edição de um usuário específico;
    -   Remoção de um usuário específico.


## Critérios de avaliação

-   Organização do código;
-   Qualidade do código;
-   Documentação do código;
-   Cumprimento dos requisitos;
-   Boas práticas de programação;
-   Utilização de boas práticas de versionamento de código;
-   Utilização de boas práticas de desenvolvimento de APIs RESTful;
-   Utilização de boas práticas de desenvolvimento de interfaces com o usuário.


## Conclusão

Não se preocupe se você não conseguir finalizar todos os itens do desafio. O importante é que você consiga demonstrar suas habilidades técnicas e conhecimentos adquiridos até o momento.   
Foque em entregar um código bem organizado e documentado, e que atenda aos requisitos propostos.

Boa sorte! :rocket:

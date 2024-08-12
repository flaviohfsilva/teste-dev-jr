
[![Logo](logo.png)](www.cloudged.com.br)

<h1 style="text-align: center;">Desafio - Desenvolvedor jr - Flávio Henrique Ferreira da Silva</h1>

## Introdução

Olá! Este desafio tem por objetivo avaliar a capacidade técnica de candidatos à vaga de desenvolvedor júnior da [CloudGed Consultoria Tributária](www.cloudged.com.br). Além disso, a avaliação consiste em analisar a capacidade de resolução de problemas e os conhecimentos técnicos específicos necessários para o cargo.

## Instruções Gerais

1.  Foi criado uma pasta 'dev-test' para armazenar os dois repositórios.
2.  A pasta com o nome 'control-manager' é o Front-end.
3.  Para o rodar o Front-end é só colocar no terminal 'npm run dev'.
4.  A pasta com o nome 'control-manager-api' é o Back-end, feito em NestJS.
5.  Para rodar o Back-end é necessário colocar no terminal 'npm run start:dev'


## 1° desafio 

1. Criação de uma API REST feita em NodeJS utilizando a framework NestJS. A API tem como função o gerenciamento de um cadastro de usuário.

2. A API tem como endpoints, criação de usuário (POST), edição de usuário (PUT), buscar todos os usuários (GET), buscar usuário por id (GET), remover usuário (DELETE) e exportar arquivo para excel (GET).

3. Como forma de documentação e organização, foi adicionado o Swagger para a API, para acessar é só colocar localhost:3001/api.

4. Utilização do MySQL como banco de dados e TypeORM para integração e gerenciamento dos dados do banco.

5. Utilização da biblioteca ExcelJS para ser possível a exportação de arquivos em .xlsx

6. Estrutura do projeto

/src
├── core
│   ├── database
│   ├── entities
├── user
│   ├── dto


A pasta core sendo responsável pelas pastas de integração com o banco de dados onde tem duas subpastas dentro. 

A 'database' faz a conexão com o banco de dados a partir do arquivo 'database.providers.ts' e o 'database.module.ts' exporta 
o provider para que toda a aplicação possa ter acesso as informações do banco.

A 'entities', dentro dela fica os arquivos que são as tabeals do banco de dados.

A pasta user é o resource da nossa aplicação onde irá conter, um arquivo module.ts, service.ts, controller.ts e o providers.ts para criação e comunicação de um repositório da tabela 'user' do banco de dados. 


## 2° desafio 

1. Desenvolva uma interface utilizando o NextJs do React que é integrada com a API que você desenvolvida. Com um layout clean e moderno, contando com dashboards para o controle e gestão dos usuários cadastrados no sistema, contendo as seguintes funcionalidades:
    -   Listagem de usuários cadastrados;
    -   Listagem de usuários removidos;
    -   Contagem de usuários removidos, atualizados e criados;
    -   Adição de um novo usuário;
    -   Edição de um usuário específico;
    -   
    -   Remoção de um usuário específico.

2. Para a integração com a API foi utilizado a biblioteca Axios.

3. Declaração global de variavéis CSS para ser utilizadas em todo o projeto.

4. Criação de SnackBar para comunicação de informações para os usuários.

5. Estrutura do projeto

/src
├── app
│   ├── components
│   │   └── modal
│   │   └── modal-remove
│   │   └── modal-update
│   │   └── sidenav
│   ├── pages
│   │   └── home
│   │   └── users
│   ├── services
└── .global.css
└── interface.tsx
└── layout.tsx
└── page.module.css
└── page.tsx


Foi feita um arquivo de interface para garantir a tipagem dos dados de entrada para as funções de requisições ao Back-end.

A pasta 'services' é onde está sendo feita a integração com a API
A pasta 'pages' está as páginas do Front-end
A pasta 'components' está todos os componentes utilizados no Front-end


Todo Challenge
==================

> ### Tecnologias

* Node/Typescript
* Express (Framework)
* Docker
* TypeORM

> ### Iniciando o projeto

```bash
  # clonar o projeto
  git clone https://github.com/cvieira850/todo-challenge.git

  # entra na pasta do projeto
  cd todo-challenge

  # copiar o .env.test gerando o .env.dev e .env.prod
  cp .env.example .env

  # Ao realizar a cópia dos arquivos mudar as configurações de env para o uso

  # levantar o banco de dados
  docker-compose up -d

  #instalar dependências
  yarn install
```
> ### Environments

Ver arquivo .env.example


|         ENV         | Obrigatório |                    Valor esperado                  |
| ------------------- | ----------- | -------------------------------------------------- |
| PORT                | true        | informação da porta que o projeto vai rodar        |
| DB_HOST             | true        | informações de conexão do banco                    |
| DB_PORT             | true        | informações de conexão do banco                    |
| DB_NAME             | true        | informações de conexão do banco                    |
| DB_USERNAME         | true        | informações de conexão do banco                    |
| DB_PASSWORD         | true        | informações de conexão do banco                    |


### Scripts do package.json

|     Comando     |                   Descrição                         |
| --------------- | --------------------------------------------------- |
| build           | gera os arquivos transpilados                       |
| start           | inicia o projeto a partir dos arquivos transpilados |
| test            | roda os testes                                      |
| test:integration| roda os testes de integração em watch mode          |
| test:staged     | roda os testes somente nos arquivos alterados       |
| test:ci         | roda os testes gerando o coverage                   |
| typeorm         | comando utilizado para criar e rodar migrations     |

> ### Sistema de pasta

* src: source da api
  * application: Controllers
  * domain: regras de negócio
  * data: implementação das regras de negócio
  * infra: implementações de interfaces voltadas para frameworks
  * main: responsável por criar instâncias de todos os objetos e fazer a composição desses objetos
  * validation: implementação das validações
* requirements: definição dos requisitos

> ### Premissas e Responsabilidades

* application:
  * Porta de entrada de uma rota
  * Responsável pela definição de Controllers
  * Responsável pela definição de http types
  * Responsável pela definição de errors
* domain:
  * Responsável pela definição da interface da regra de negócio
* data:
  * Responsável pela implementação da regra de negócio
  * Responsável pela definição da interface a ser utilizada no infra layer
* infra:
  * Responsável pela comunicação com banco de dados
  * Responsável pela implementação da interface criada no data layer
  * Responsável pela utilização de métodos oriundos de libs externas
* main:
  * Responsável por fazer a instância das classes para poder trabalhar com abstrações nos outros layers
  * Local onde fazemos a composição dos objetos
  * Responsável pelo levantamento do servidor

> ### Git

Antes de cada commit ele irá verificar se tem algum erro de eslint ou nos testes,
isso evita um commit que quebre o ambiente.

Para mais informações veja a documentação do
[husky](https://github.com/typicode/husky)

> ### Banco de dados e migrations
  Utilizamos o Typeorm com postgreSQL

  Para **criar uma migration** nova basta rodar o comando: *yarn typeorm migration:create -n nomeDaMigration*
  Para **rodar as migrations** basta rodar o comando: *yarn typeorm migration:run*

  Para mais informações veja a documentação do [TypeORM](https://typeorm.io/#/)

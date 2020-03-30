## Desafio X-Improvement

Projeto desenvolvido para inscrição da equipe no X-Improvement da Landix Sistemas.

## Requisitos

* Node 10.16.3
* Yarn 1.16.0

## Banco de Dados < MariaDB >

Criar um database para o sistema, e configurar seus dados de acesso no arquivo:

x-improvement/backend/src/config/database.js

## Back-end < NODE >

No diretório x-improvement/backend/ execute os comandos:

```
yarn
yarn sequelize db:migrate
yarn sequelize db:seed
yarn dev
```

## Front-end < VUEJS + QUASAR >

No diretório x-improvement/frontend/ximprovement/ execute os comandos:

```
npm install
npm install -g @quasar/cli
quasar dev
```

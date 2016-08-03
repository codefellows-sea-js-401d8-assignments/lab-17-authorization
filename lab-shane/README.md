# Lab 11: Crud Api with Express AND MongoDB!!!

This project creates an http server through which a user can use to upload and access data about Pokemon through a database saved on MongoDB.

## Getting Started
To begin, simply clone down the repo and run it in the terminal via `npm i`. All commands outlaid below will assume input in terminal.

- To start the server, use `node lib/server.js`.

  - To upload initial data onto the server, use `http POST localhost:3000/api/pokemon/ name=squirtle type=water`

  - To then "GET" that data, use `http GET localhost:3000/api/pokemon/squirtle`.

  - To update data already on server, use a "PUT" or "PATCH" request `http PUT localhost:3000/api/pokemon/squirtle name=squirtle type=awesome`

    - To then retrieve the updated data, simply perform a "GET" `http GET localhost:3000/api/pokemon/squirtle`

  - To "DELETE" data from the server, use `http DELETE localhost:3000/api/pokemon/squirtle`

  - To view all Pokemon currently on the server, use `http GET localhost:3000/api/pokemon/all`

- To run any tests or file linting, use `gulp`

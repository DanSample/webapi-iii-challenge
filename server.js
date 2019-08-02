const express = require('express');
const { logger } = require('./middleware');
const usersRouter = require('./routers/users');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

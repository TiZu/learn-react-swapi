/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const jsonServer = require('json-server');
const path = require('path');

const port = process.env.API_PORT || 4000;
const pubPath = path.join(__dirname, 'public');
const dbPath = path.join(__dirname, 'data', 'db.json');

const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({
  static: pubPath,
  logger: true,
});

server.use(middlewares);
server.use('/api', router);

server.listen(port, () => {
  console.log(`MockApi: Server running on port ${port}`);
});

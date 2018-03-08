require('babel-register');
global.Promise = require('bluebird');

const server1 = require('./src/client-service/clientService').default;
// const server2 = require('./src/backend-service/backendService').default;

server1(3000);
// server2(4000);

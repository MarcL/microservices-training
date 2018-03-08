require('babel-register');
global.Promise = require('bluebird');

const server1 = require('./src/client-service/clientService').default;
const server2 = require('./src/backend-service/backendService').default;
require('./src/second-backend-service/backendService2');

server1(3000);
server2(4000);

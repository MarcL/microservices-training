require('babel-register');

const server1 = require('./client-service/clientService').default;
const server2 = require('./backend-service/backendService').default;

server1(3000);
server2(4000);

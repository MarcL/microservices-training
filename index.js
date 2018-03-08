require('babel-register');
global.Promise = require('bluebird');

const server1 = require('./src/client-service/clientService').default;
const server2 = require('./src/backend-service/backendService').default;
const eventStore = require('./src/eventStore/eventStore').default;

server1(3000);
server2(4000);
eventStore(5001);

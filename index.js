require('babel-register');
global.Promise = require('bluebird');

const clientServer = require('./src/client-service/clientService').default;
const backendServer = require('./src/backend-service/backendService').default;
const eventStore = require('./src/eventStore/eventStore').default;

clientServer(3000);
eventStore(5001);

setTimeout(() => {
    backendServer(4000);
}, 1000);

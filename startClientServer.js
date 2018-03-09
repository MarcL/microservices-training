require('babel-register');
global.Promise = require('bluebird');

const clientServer = require('./src/client-service/clientService').default;

clientServer(3000);

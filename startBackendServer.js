require('babel-register');
global.Promise = require('bluebird');

const backendServer = require('./src/backend-service/backendService').default;

backendServer(4000);

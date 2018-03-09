require('babel-register');
global.Promise = require('bluebird');

const eventStore = require('./src/eventStore/eventStore').default;

eventStore(5001);

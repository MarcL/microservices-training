require('babel-register');

const server1 = require('./server/service1').default;
const server2 = require('./server/service2').default;
server1(3000);
server2(4000);

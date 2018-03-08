import createServer from './createServer';

const applyRoutes = (app) => {
    app.post('/users', (request, response) => {
        console.log('service2:');
        console.log(request.body);
        response.json({ message: 'service2' });
    });
};

const service2 = port => createServer(port, applyRoutes);

export default service2;

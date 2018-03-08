import createServer from '../createServer';

const applyRoutes = (app) => {
    app.post('/users', (request, response) => {
        console.log('backedService:');
        console.log(request.body);
        response.json({ message: 'service2' });
    });
};

const backedService = port => createServer(port, applyRoutes);

export default backedService;

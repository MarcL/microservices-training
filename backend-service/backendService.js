import createServer from '../createServer';

const applyRoutes = (app) => {
    app.post('/users', (request, response) => {
        const { timeout = 0 } = request.body;
        console.log('backedService:');
        console.log(request.body);
        return Promise.delay(timeout).then(() => {
            response.json({ message: 'service2' });
        });
    });
};

const backedService = port => createServer(port, applyRoutes);

export default backedService;

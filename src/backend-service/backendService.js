import createServer from '../createServer';

const applyRoutes = (app) => {
    app.post('/users', async (request, response) => {
        const { timeout = 0 } = request.body;
        await Promise.delay(timeout);
        return response.json({ message: 'Backend service responding' });
    });
};

const backedService = port => createServer(port, applyRoutes);

export default backedService;

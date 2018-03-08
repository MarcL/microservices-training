import createServer from '../createServer';
import { consume } from '../messagingClient';

const QUEUE_NAME = 'user';

const applyRoutes = (app) => {
    app.post('/users', async (request, response) => {
        const { timeout = 0 } = request.body;
        await Promise.delay(timeout);
        return response.json({ message: 'Backend service responding' });
    });
};

const eventHandler = (event) => {
    // Create user
    if (event.type === 'user/create') {
        console.log('Create new user');
        console.log(event.payload);
    }

    // Send message to client
};

const backedService = port => createServer(port, applyRoutes);
consume(QUEUE_NAME, eventHandler);

export default backedService;

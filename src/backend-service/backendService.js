import createServer from '../createServer';
import { publish, consume } from '../messagingClient';
import event from '../client-service/event';
import { USER_QUEUE, RESPONSE_QUEUE } from '../queueNames';

const applyRoutes = (app) => {
    app.post('/users', async (request, response) => {
        const { timeout = 0 } = request.body;
        await Promise.delay(timeout);
        return response.json({ message: 'Backend service responding' });
    });
};

const eventHandler = (consumedEvent) => {
    // Create user
    if (consumedEvent.type === 'user/create') {
        console.log(`Create new user : ${consumedEvent.id}`);
        console.log(consumedEvent.payload);

        const responseEvent = event('user/created', { id: consumedEvent.id });
        publish(RESPONSE_QUEUE, responseEvent);
    }
};

const backedService = port => createServer(port, applyRoutes);
consume(USER_QUEUE, eventHandler);

export default backedService;

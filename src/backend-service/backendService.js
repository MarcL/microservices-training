import createServer from '../createServer';
import { publish, consume } from '../messagingClient';
import event from '../event';
import { USER_TOPIC, USER_QUEUE, RESPONSE_QUEUE } from '../queueNames';
import { USER_CREATE, USER_CREATED } from '../eventNames';

const applyRoutes = (app) => {
    app.post('/users', async (request, response) => {
        const { timeout = 0 } = request.body;
        await Promise.delay(timeout);
        return response.json({ message: 'Backend service responding' });
    });
};

const eventHandler = (consumedEvent) => {
    // Create user
    if (consumedEvent.type === USER_CREATE) {
        console.log(`Create new user (service 1) : ${consumedEvent.id}`);
        console.log(consumedEvent.payload);

        const responseEvent = event(USER_CREATED, { id: consumedEvent.id });
        publish(RESPONSE_QUEUE, responseEvent);
    }
};

const backedService = port => createServer(port, applyRoutes);
consume(USER_TOPIC, USER_QUEUE, eventHandler);

export default backedService;

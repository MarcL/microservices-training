import userCreate from './middleware/userCreate';
import userCreateMessage from './middleware/userCreateMessage';
import createServer from '../createServer';
import { consume } from '../messagingClient';
import { RESPONSE_QUEUE } from '../queueNames';

const applyRoutes = (app) => {
    app.post('/', userCreate);
    app.post('/message', userCreateMessage);
};

const eventHandler = (consumedEvent) => {
    if (consumedEvent.type === 'user/created') {
        console.log('Confirmed user created');
        console.log(consumedEvent.payload);
    }
};

const clientService = port => createServer(port, applyRoutes);
consume(RESPONSE_QUEUE, eventHandler);

export default clientService;

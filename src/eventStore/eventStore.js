import Datastore from 'nedb';
import path from 'path';
import { consume } from '../messagingClient';
import createServer from '../createServer';
import { USER_TOPIC, EVENT_STORE } from '../queueNames';

const appDirectory = path.dirname(require.main.filename);
const database = new Datastore({
    filename: `${appDirectory}/data/database.db`,
    autoload: true,
});

const eventHandler = (consumedEvent) => {
    console.log(`Create new user (service 2) : ${consumedEvent.id}`);
    console.log(consumedEvent.payload);

    database.insert(consumedEvent);
};

const applyRoutes = (app) => {
    app.get('/', (request, response) => {
        const { timestamp = 0 } = request.query;

        database.find({ timestamp: { $gt: Number(timestamp) } })
            .sort({ timestamp: 1 })
            .exec((error, documents) => {
                response.json({ events: documents });
            });
    });
};

const eventStore = port => createServer(port, applyRoutes);
consume(USER_TOPIC, EVENT_STORE, eventHandler);

export default eventStore;

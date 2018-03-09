import Datastore from 'nedb';
import path from 'path';
import createServer from '../createServer';
import { publish, consume } from '../messagingClient';
import event from '../event';
import { USER_TOPIC, USER_QUEUE, RESPONSE_QUEUE } from '../queueNames';
import { USER_CREATE, USER_CREATED } from '../eventNames';
import callGateway from '../client-service/service/callGateway';

let eventCount = 0;

const appDirectory = path.dirname(require.main.filename);
const database = new Datastore({
    filename: `${appDirectory}/data/view.db`,
    autoload: true,
});

const applyRoutes = (app) => {
    app.post('/users', async (request, response) => {
        const { timeout = 0 } = request.body;
        await Promise.delay(timeout);
        return response.json({ message: 'Backend service responding' });
    });

    app.get('/events', (request, response) => {
        response.json({ count: eventCount });
    });
};

const writeViewData = (count, lastId, timestamp) =>
    database.update({ timestamp }, {
        eventCount: count,
        lastId,
        timestamp,
    }, { upsert: true });

const readLastViewData = () =>
    new Promise((resolve) => {
        database
            .find({})
            .sort({ timestamp: -1 })
            .limit(1)
            .exec((error, documents) => {
                const data = (error || documents.length === 0 ? {} : documents[0]);
                resolve(data);
            });
    });

const serverStarted = () => readLastViewData()
    .then((document) => {
        const { timestamp, eventCount: lastEventCount = 0 } = document;
        eventCount += lastEventCount;

        return callGateway('http://eventstore:5001/', {}, 'get', { timestamp });
    })
    .then(({ events }) => {
        if (events.length > 0) {
            const { id: lastEventId, timestamp } = events[events.length - 1];

            eventCount += events.length;
            return writeViewData(eventCount, lastEventId, timestamp);
        }

        return Promise.resolve();
    })
    .catch((error) => {
        console.log('Error calling eventStore');
        console.log(error.message);
    });

const eventHandler = (consumedEvent) => {
    eventCount += 1;

    if (consumedEvent.type === USER_CREATE) {
        console.log(`Create new user (service 1) : ${consumedEvent.id}`);
        console.log(consumedEvent.payload);

        const responseEvent = event(USER_CREATED, { id: consumedEvent.id });
        publish(RESPONSE_QUEUE, responseEvent);
    }
};

const backedService = port => createServer(port, applyRoutes, serverStarted);
consume(USER_TOPIC, USER_QUEUE, eventHandler);

export default backedService;

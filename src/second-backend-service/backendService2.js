import { consume } from '../messagingClient';
import { USER_TOPIC, USER_QUEUE2 } from '../queueNames';
import { USER_CREATE } from '../eventNames';

const eventHandler = (consumedEvent) => {
    // Create user
    if (consumedEvent.type === USER_CREATE) {
        console.log(`Create new user (service 2) : ${consumedEvent.id}`);
        console.log(consumedEvent.payload);
    }
};

consume(USER_TOPIC, USER_QUEUE2, eventHandler);

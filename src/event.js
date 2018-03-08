import uuid from 'uuid';

const event = (type, payload) => ({
    id: uuid(),
    timestamp: Date.now(),
    type,
    payload,
});

export default event;

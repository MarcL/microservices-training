const event = (userData, type, payload) => ({
    id: uuid(),
    timestamp: Date.now(),
    type,
    payload
});

export default event;

import amqplib from 'amqplib';

let messagingClient = null;
let channel = null;

const getChannel = async () => {
    if (!messagingClient) {
        messagingClient = await amqplib.connect('amqp://rabbit');

        channel = await messagingClient.createChannel();
    }

    return channel;
};

const createQueue = async (queueName, messageChannel) =>
    messageChannel.assertQueue(queueName);

const createExchange = (exchangeName, messageChannel) => {
    messageChannel.assertExchange(exchangeName, 'fanout', { durable: false });
};

const publish = async (exchangeName, event) => {
    const messageChannel = await getChannel();
    createExchange(exchangeName, messageChannel);

    return messageChannel.publish(
        exchangeName,
        '',
        Buffer.from(JSON.stringify(event)),
    );
};

const consume = async (exchangeName, queueName, handleEvent) => {
    const messageChannel = await getChannel();
    createExchange(exchangeName, messageChannel);
    const queue = await createQueue(queueName, messageChannel);

    messageChannel.bindQueue(queue.queue, exchangeName, '');

    return messageChannel.consume(queue.queue, (message) => {
        if (message !== null) {
            const event = JSON.parse(message.content.toString());
            messageChannel.ack(message);

            return handleEvent(event);
        }
        throw new Error('No message data found');
    });
};

export { publish, consume };

import amqplib from 'amqplib';

let messagingClient = null;
let channel = null;

const getChannel = async () => {
    if (!messagingClient) {
        messagingClient = await amqplib.connect('amqp://localhost');

        channel = await messagingClient.createChannel();
    }

    return channel;
};

const createQueue = async (queueName, messageChannel) => {
    messageChannel.assertQueue(queueName);
};

const publish = async (queueName, event) => {
    const messageChannel = await getChannel();
    await createQueue(queueName, messageChannel);

    return messageChannel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(event)),
    );
};

const consume = async (queueName, handleEvent) => {
    const messageChannel = await getChannel();
    await createQueue(queueName, messageChannel);

    return messageChannel.consume(queueName, (message) => {
        if (message !== null) {
            const event = JSON.parse(message.content.toString());
            messageChannel.ack(message);

            return handleEvent(event);
        }
        throw new Error('No message data found');
    });
};

export { publish, consume };

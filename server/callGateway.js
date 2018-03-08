import requestPromise from 'request-promise';

const callGateway = (uri, body) => {
    const options = {
        uri,
        headers: {
            'Content-Type': 'application/json',
        },
        body,
        json: true,
    };

    return requestPromise.post(options);
};

export default callGateway;

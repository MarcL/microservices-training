import requestPromise from 'request-promise';

const DEFAULT_REQUEST_TIMEOUT_MILLISECONDS = 5000;

const callGateway = (uri, body) => {
    const options = {
        uri,
        headers: {
            'Content-Type': 'application/json',
        },
        body,
        json: true,
        timeout: DEFAULT_REQUEST_TIMEOUT_MILLISECONDS,
    };

    return requestPromise.post(options);
};

export default callGateway;

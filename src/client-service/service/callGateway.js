import requestPromise from 'request-promise';

const DEFAULT_REQUEST_TIMEOUT_MILLISECONDS = 5000;

const callGateway = (uri, body, method = 'post') => {
    const options = {
        method,
        uri,
        headers: {
            'Content-Type': 'application/json',
        },
        body,
        json: true,
        timeout: DEFAULT_REQUEST_TIMEOUT_MILLISECONDS,
    };

    return requestPromise(options);
};

export default callGateway;

import chai from 'chai';
import path from 'path';
import requestPromise from 'request-promise';
import { Pact } from '@pact-foundation/pact';

const { expect } = chai;

const MOCK_SERVER_PORT = 2202;

describe('client service', () => {
    const provider = new Pact({
        consumer: 'ClientService',
        provider: 'BackendService',
        port: MOCK_SERVER_PORT,
        log: path.resolve(process.cwd(), 'logs', 'pact.log'),
        dir: path.resolve(process.cwd(), 'pacts'),
        logLevel: 'INFO',
        spec: 2,
    });

    const expectedBackendResponse = { message: 'Backend service responding' };
    const defaultRequestBody = {
        email: 'test@test.com',
        password: 'testPassword',
    };

    before(() => provider.setup()
        .then(() => provider.addInteraction({
            state: 'I have no users',
            uponReceiving: 'a request to create a new user',
            withRequest: {
                method: 'POST',
                path: '/users',
                headers: { Accept: 'application/json' },
                body: defaultRequestBody,
            },
            willRespondWith: {
                status: 200,
                body: expectedBackendResponse,
            },
        })));

    after(() => {
        provider.finalize();
    });

    const makeClientRequest = (body) => {
        const options = {
            uri: `http://localhost:${MOCK_SERVER_PORT}/users`,
            method: 'POST',
            json: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        };
        return requestPromise(options);
    };

    it('should return expected response', () =>
        makeClientRequest(defaultRequestBody)
            .then(() => {
                expect(provider.verify()).to.not.throw;
            }));
});

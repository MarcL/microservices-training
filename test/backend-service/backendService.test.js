import { Verifier } from '@pact-foundation/pact';
import path from 'path';

const BACKEND_URL = 'http://localhost:4000';

describe('backend service', () => {
    it('should have a pact with the client', () => {
        const pactsDirectory = path.resolve(process.cwd(), 'pacts');
        const verificationOpts = {
            providerBaseUrl: BACKEND_URL,
            provider: 'BackendService',
            pactUrls: [`${pactsDirectory}/clientservice-backendservice.json`],
        };

        const verifier = new Verifier();
        return verifier.verifyProvider(verificationOpts);
    });
});

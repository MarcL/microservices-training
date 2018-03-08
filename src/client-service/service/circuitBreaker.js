const CLOSED_STATE = 'closed';
const OPEN_STATE = 'open';
const HALF_OPEN_STATE = 'half-open';

const DEFAULT_TIMEOUT = 2000;

let state = CLOSED_STATE;
let timer = null;
const changeState = (newState) => {
    console.log(`CircuitBreaker : change state : ${state} => ${newState}`);
    state = newState;
};

const circuitBreaker = (httpRequest) => {
    switch (state) {
    default:
    case CLOSED_STATE:
        return httpRequest().catch((error) => {
            changeState(OPEN_STATE);
            throw new Error(error);
        });
    case OPEN_STATE:
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                changeState(HALF_OPEN_STATE);
            }, DEFAULT_TIMEOUT);
        }

        return Promise.reject(new Error('Circuit breaker state : OPEN'));
    case HALF_OPEN_STATE:
        return httpRequest()
            .then((data) => {
                changeState(CLOSED_STATE);
                return data;
            })
            .catch((error) => {
                changeState(OPEN_STATE);
                throw new Error(error);
            });
    }
};

export default circuitBreaker;

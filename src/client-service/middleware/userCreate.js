import event from '../../event';
import validateUserData from '../validator/validateUserData';
import callGateway from '../service/callGateway';
import circuitBreaker from '../service/circuitBreaker';
import { USER_CREATE } from '../../eventNames';

const userCreate = (request, response) => {
    const userData = request.body;

    if (validateUserData(userData)) {
        const { email, password, timeout } = userData;

        const payload = {
            email,
            password,
        };

        const newEvent = Object.assign({}, event(USER_CREATE, payload), {
            timeout,
        });

        const makeRequest = () =>
            callGateway('http://backend:4000/users', newEvent);

        return circuitBreaker(makeRequest)
            .then((data) => {
                response.json({ success: true, data });
            })
            .catch((error) => {
                response.json({ success: false, error: error.message });
            });
    }

    return response.json({
        success: false,
        error: 'Aggregate root failure (validation failed)',
    });
};

export default userCreate;

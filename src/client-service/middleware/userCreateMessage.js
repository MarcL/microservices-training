import event from '../event';
import validateUserData from '../validator/validateUserData';
import { publish } from '../../messagingClient';
import { USER_QUEUE } from '../../queueNames';

const userCreateMessage = (request, response) => {
    const userData = request.body;

    if (validateUserData(userData)) {
        const { email, password, timeout } = userData;

        const payload = {
            email,
            password,
        };

        const newEvent = Object.assign({}, event('user/create', payload), {
            timeout,
        });

        return publish(USER_QUEUE, newEvent)
            .then(() => {
                response.json({ success: true });
            })
            .catch((error) => {
                response.json({
                    success: false,
                    error: error.message,
                });
            });
    }

    return response.json({
        success: false,
        error: 'Aggregate root failure (validation failed)',
    });
};

export default userCreateMessage;

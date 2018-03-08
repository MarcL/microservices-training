import event from '../../event';
import validateUserData from '../validator/validateUserData';
import { publish } from '../../messagingClient';
import { USER_TOPIC } from '../../queueNames';
import { USER_CREATE } from '../../eventNames';

const userCreateMessage = (request, response) => {
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

        return publish(USER_TOPIC, newEvent)
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

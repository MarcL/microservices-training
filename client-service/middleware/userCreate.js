import event from '../event';
import validateUserData from '../validator/validateUserData';
import callGateway from '../service/callGateway';

const userCreate = (request, response) => {
    const userData = request.body;

    if (validateUserData(userData)) {
        const { email, password, timeout } = userData;

        const payload = {
            email,
            password,
        };

        const newEvent = Object.assign(
            {},
            event(userData, 'user/create', payload),
            { timeout },
        );

        return callGateway('http://localhost:4000/users', newEvent)
            .then(() => {
                response.json({ success: true });
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

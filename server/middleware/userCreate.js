import event from '../event';
import validateUserData from '../validators/validateUserData';
import callGateway from '../callGateway';

const userCreate = (request, response) => {
    const userData = request.body;

    if (validateUserData(userData)) {
        const { email, password } = userData;

        const payload = {
            email,
            password,
        };

        const newEvent = event(userData, 'user/create', payload);

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

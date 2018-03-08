import express from 'express';
import bodyParser from 'body-parser';
import event from './event';
import validateUserData from './validateUserData';
import callGateway from './callGateway';

const service1 = (port) => {
    const app = express();
    app.use(bodyParser.json());

    app.post('/', (request, response) => {
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
    });

    app.listen(port, () => console.log(`Listening on port : ${port}`));

    return app;
};

export default service1;

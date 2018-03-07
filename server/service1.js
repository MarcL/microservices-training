import express from 'express';
import bodyParser from 'body-parser';
import uuid from 'uuid';
import requestPromise from 'request-promise';
import event from './event';

const validateUser = userData => {
    return userData && userData.email && userData.password;
};

const callGateway = body => {
    const options = {
        uri: 'http://localhost:4000/users',
        headers: {
            'Content-Type': 'application/json'
        },
        body,
        json: true
    };

    return requestPromise.post(options);
};

const service1 = port => {
    const app = express();
    app.use(bodyParser.json());

    app.post('/', (request, response) => {
        const userData = request.body;

        if (validateUser(userData)) {
            const {email, password} = userData;

            const payload = {
                email,
                password
            };

            const event = event(userData, 'user/create', payload);

            return callGateway(event)
                .then(() => {
                    response.json({success: true});
                })
                .catch(error => {
                    reponse.json({success: false, error: error.message});
                });
        }

        response.json({success: false, error: 'Aggregate route failure'});
    });

    app.listen(port, () => console.log(`Listening on port : ${port}`));

    return app;
};

export default service1;

import express from 'express';
import bodyParser from 'body-parser';

const service2 = port => {
    const app = express();
    app.use(bodyParser.json());

    app.post('/users', (request, response) => {
        console.log('service2:');
        console.log(request.body);
        response.json({message: 'service2'});
    });

    app.listen(port, () => console.log(`Listening on port : ${port}`));

    return app;
};

export default service2;

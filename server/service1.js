import express from 'express';
import bodyParser from 'body-parser';
import userCreate from './middleware/userCreate';

const service1 = (port) => {
    const app = express();
    app.use(bodyParser.json());

    app.post('/', userCreate);

    app.listen(port, () => console.log(`Listening on port : ${port}`));

    return app;
};

export default service1;

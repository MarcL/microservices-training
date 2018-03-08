import express from 'express';
import bodyParser from 'body-parser';

const service1 = (port, applyRoutes) => {
    const app = express();
    app.use(bodyParser.json());

    applyRoutes(app);

    app.listen(port, () => console.log(`Listening on port : ${port}`));

    return app;
};

export default service1;

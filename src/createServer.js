import express from 'express';
import bodyParser from 'body-parser';

const createServer = (port, applyRoutes, serverStarted = null) => {
    const app = express();
    app.use(bodyParser.json());

    applyRoutes(app);

    app.listen(port, () => {
        if (serverStarted) {
            serverStarted();
        }
        console.log(`Listening on port : ${port}`);
    });

    return app;
};

export default createServer;

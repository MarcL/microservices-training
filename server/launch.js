import express from 'express';

const createServer = (port = 3000) => {
    const app = express();

    app.listen(port, () => console.log(`Listening on port : ${port}`));

    return app;
};

export default createServer;

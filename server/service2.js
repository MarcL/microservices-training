import express from 'express';

const service2 = port => {
    const app = express();

    app.get('/', (request, response) => response.json({message: 'service2'}));
    app.listen(port, () => console.log(`Listening on port : ${port}`));

    return app;
};

export default service2;

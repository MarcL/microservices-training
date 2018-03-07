import express from 'express';

const service1 = port => {
    const app = express();

    app.get('/', (request, response) => response.json({message: 'service1'}));
    app.listen(port, () => console.log(`Listening on port : ${port}`));

    return app;
};

export default service1;

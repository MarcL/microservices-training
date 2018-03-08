import userCreate from './middleware/userCreate';
import createServer from './createServer';

const applyRoutes = (app) => {
    app.post('/', userCreate);
};

const service1 = port => createServer(port, applyRoutes);

export default service1;

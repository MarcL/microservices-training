import userCreate from './middleware/userCreate';
import createServer from '../createServer';

const applyRoutes = (app) => {
    app.post('/', userCreate);
};

const clientService = port => createServer(port, applyRoutes);

export default clientService;

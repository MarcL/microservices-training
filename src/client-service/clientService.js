import userCreate from './middleware/userCreate';
import userCreateMessage from './middleware/userCreateMessage';
import createServer from '../createServer';

const applyRoutes = (app) => {
    app.post('/', userCreate);
    app.post('/message', userCreateMessage);
};

const clientService = port => createServer(port, applyRoutes);

export default clientService;

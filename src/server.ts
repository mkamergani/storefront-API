import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './handlers/usersHandler';
import productsRoutes from './handlers/productsHandler';
import ordersRoutes from './handlers/ordersHandler';
import dashboardRoutes from './handlers/dashboardHandler';

//_____________Configurations_____________________
const app: express.Application = express();
const address: string = '0.0.0.0:3000';
const corsOptions = {
    origin: '',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

//_________________Routes___________________________
app.get('/', function (req: Request, res: Response) {
    res.send('Welcome to the Storefront API');
});

userRoutes(app);
productsRoutes(app);
ordersRoutes(app);
dashboardRoutes(app);
//_________________Server___________________________
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

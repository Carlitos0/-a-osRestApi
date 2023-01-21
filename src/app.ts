import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import { environment } from './config/env';
import { connect } from './database/database';
import userRoute from './routes/users/user.routes';
import specialRoutes from './routes/users/special.routes';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

const app: express.Application = express();  
const env = environment;
connect();

app.set('port', env.PORT || 3500);

// middlwares
app.use(morgan('dev'));
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS	'],
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passportMiddleware);

app.use('/users', userRoute, specialRoutes);


export default app;
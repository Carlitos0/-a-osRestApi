import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import { environment } from './config/env';
import { connect } from './database/database';
import userRoute from './routes/users/user.routes';
import rolesRoute from './routes/roles/roles.routes'
import permissionRoute from './routes/permission/permission.routes';
import specialRoutes from './routes/users/special.routes';
import DocumentTypeRoutes from './routes/commons/documentsRoutes/documenType.routes';
import commonsRoutes from './routes/commons/commons.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import pkg from '../package.json';

// inicializaciones
const app: express.Application = express();  
const env = environment;
connect();

// settings
app.set('port', env.PORT || 3500);

// middlwares
app.use(morgan('dev'));
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS	'],
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(passport.initialize());
// passport.use(passportMiddleware);

// get de bienvienida
app.get('/', (req, res) => {
    res.json({
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
    }) 
})

// routes
app.use('/users', userRoute, specialRoutes);
app.use('/roles', rolesRoute);
app.use('/permission', permissionRoute);
app.use('/documents', DocumentTypeRoutes)
app.use('/commons', commonsRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default app;
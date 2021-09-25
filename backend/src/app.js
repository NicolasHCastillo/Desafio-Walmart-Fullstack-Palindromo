import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import api from './api/index';
import appConfig from './config/index';

const app = express();

//#region CONFIGURATION

app.set('port', appConfig.PORT || 3001);

//#endregion

//#region MIDDLEWARES

app
   .use(cors())
   .use(morgan('dev'))
   .use(express.json())
   .use(express.urlencoded({ extended: false }));

//#endregion

//#region ROUTES

app.get('/', (req, res) => {
    res.send('DESAFIO WALMART CHILE');
});

app.use('/', api);

//#endregion

export default app;
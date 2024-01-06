import express from 'express';
import { enableCors } from "./config/plugins/cors.js";
import { globalHandleError } from './common/errors/errorController.js';
import { AppErrors } from './common/errors/appError.js';
import { router } from './routes/index.js';
// import bodyParser from 'body-parser';

const app = express();

const ACCEPTED_ORIGINS = [];

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

enableCors(app, ACCEPTED_ORIGINS);

app.use('/api/v1', router);

app.all('*', (req, res, next) =>{
    return next(new AppErrors(`this link does not exist, or ${req.originalUrl} not found`,404))
});

app.use(globalHandleError)

export default app;
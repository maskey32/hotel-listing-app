import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from './config/database.config';
import cors from 'cors';

import indexRouter from './routes/indexRoute';
import userRouter from './routes/userRoute';
import todosRouter from './routes/todos';
import viewsRouter from './routes/viewsRoute';
import listingRouter from './routes/listingRoute';

db.sync().then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.log(err);
})

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// app.use('/', indexRouter);
// app.use('/user', viewsRouter);
app.use('/api/user', userRouter);
app.use('/api/listing', listingRouter);
app.use('/api/todos', todosRouter);

// Connecting to the frontend
const clientPath = path.join(__dirname, '../frontend/build');
app.use(express.static(clientPath));

// Sending the frontend to the client to view
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname + '../frontend/build/index.html'))
})

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;

const express = require('express');
const app = require('./configs/express')(express);
const { stream } = require('./configs/winston');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const api = require('./api');
const jwtMiddleware = require('./middleware/globalMiddleware/jwtMid');
const limitMiddleware = require('./middleware/globalMiddleware/limiterMid');
const errHandlerMiddleware = require('./middleware/globalMiddleware/errorHandlerMid');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined', { stream }));
app.use(jwtMiddleware);
app.use(limitMiddleware);

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(api);
app.use(errHandlerMiddleware);

module.exports = app;

const express = require('express');
const app = require('../configs/express')(express);
const { stream } = require('../configs/winston');
const morgan = require('morgan');
const path = require('path');
const route = require('./route');
const cors = require('cors');
// const { connectToDatabase } = require('../configs/mongoose');

const jwtMiddleware = require('../middleware/globalMiddleware/jwtMid');
const limitMiddleware = require('../middleware/globalMiddleware/limiterMid');
const errHandlerMiddleware = require('../middleware/globalMiddleware/errorHandlerMid');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);
app.set('trust proxy', 1);

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/script', express.static(path.join(__dirname, '../script')));

app.use(morgan('combined', { stream }));
app.use(jwtMiddleware); // 검증 미들웨어가 먼저 사용되어야 함.
app.use(limitMiddleware); // api 접속이 단시간 급격하게 증가할 시 접속 제한

app.use(errHandlerMiddleware);

app.use(route);


// const port = process.env.PORT || 4002;

// app.listen(port, async () => {
//   await connectToDatabase();
//   console.log(`Server Connected, ${port} port!`);
// });

module.exports = app;

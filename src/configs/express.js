module.exports = function (express) {
  const dotenv = require('dotenv');
  require('dotenv').config();
  const cookieParser = require('cookie-parser');
  if (process.env.VERCEL_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
  } else {
    dotenv.config({ path: '.env.local' });
  }

  const helmet = require('helmet');

  const app = express();

  app.disable('x-powered-by');
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          formAction: ["'self'"],
          scriptSrc: ["'self'"],
        },
      },
    })
  );
  app.use(helmet.xssFilter());

  return app;
};

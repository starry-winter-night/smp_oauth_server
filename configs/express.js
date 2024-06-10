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

  const cspOptions = {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://vercel.live'],
      styleSrc: ["'self'", `'unsafe-inline'`, 'https://vercel.live'],
      connectSrc: ["'self'", 'https://vercel.live', 'https://vitals.vercel-insights.com', 'wss://ws-us3.pusher.com'],
      imgSrc: ["'self'", 'data:', 'blob:', 'https://vercel.com'],
      fontSrc: ["'self'", 'https://assets.vercel.com'],
      objectSrc: ["'none'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      frameSrc: ["'self'", 'https://vercel.live'],
    },
  };
  app.use(helmet.contentSecurityPolicy(cspOptions));
  app.use(helmet.xssFilter());

  return app;
};

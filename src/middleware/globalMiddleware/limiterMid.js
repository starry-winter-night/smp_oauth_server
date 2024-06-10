const rateLimit = require('express-rate-limit');
const time = 1 * 60 * 1000; // 1분
const maxConnect = 50; // 각각의 IP를 1분에 50개의 요청으로 제한

// api 접속 시마다 ip의 트래픽을 검사, 1분에 50회를 넘을 시 접속 제한 (1분)
const limiter = rateLimit({
  windowMs: time,
  max: maxConnect,
  headers: true,
  message: '해당 IP의 요청이 너무 많습니다. 잠시 후에 다시 시도하십시오',
  handler: (req, res, next, options) => {
    // 제한이 초과된 경우의 로그 기록
    console.warn(`Rate limit reached for IP: ${req.ip}`);
    res.status(options.statusCode).json({
      message: options.message,
    });
  },
});
module.exports = limiter;

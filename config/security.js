const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const securityMiddleware = (app) => {
  app.use(helmet());

  app.use(cors());

  app.use(morgan("dev"));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later",
  });

  app.use(limiter);
};

module.exports = securityMiddleware;

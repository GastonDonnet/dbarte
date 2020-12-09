//Imports
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
//const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const usersRoutes = require('./routes/usersRoutes');

const app = express();

// Global Midlewares
// Implement CORS
app.use(cors());

// Set Security HTTP Headers
app.use(helmet());

// Development Loggin
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limita a 100 request x hora
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Parsers
app.use(express.json({ limit: '50kb' })); // Body parser, reading data from body into rq.body
app.use(cookieParser()); // Cookie parser

// Data sanitization gainst XSS
app.use(xss());

// Prevent HTTP Parameter Polution (Saca parametros repetidos exeptos los de la whitelist) TODO: VER MEJOR FORMA
// app.use(
//   hpp({
//     whitelist: [],
//   })
// );

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Compression
app.use(compression());

// Test Custom middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', usersRoutes);

// 404
app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});
// GlobalErrorMiddleware
app.use(globalErrorHandler);

//Export
module.exports = app;

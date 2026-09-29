const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const getCleanClientUrl = () => (env.clientUrl || '').replace(/\/+$/, '');

const isOriginAllowed = (origin) => {
  if (!origin) return true;

  const cleanOrigin = origin.replace(/\/+$/, '');
  const cleanClientUrl = getCleanClientUrl();

  if (cleanClientUrl && cleanOrigin === cleanClientUrl) return true;
  if (cleanOrigin.startsWith('http://localhost:')) return true;
  if (cleanOrigin.endsWith('.vercel.app')) return true;

  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        return callback(null, origin || true);
      }
      return callback(new Error(`CORS rejection: Origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
  },
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/products', productRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;

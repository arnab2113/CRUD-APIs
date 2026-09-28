const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

// Middleware to ensure DB is connected for serverless function calls on Vercel
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

if (process.env.VERCEL !== '1' && process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(env.port, () => {
      console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
    });
  });
}

module.exports = app;

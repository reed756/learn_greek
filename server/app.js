import cors from 'cors';
import express from 'express';
import { apiRouter } from './routes/api-router.js';
const app = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }),
  express.json()
);
const allowedOrigins = [
  'https://learn-greek-language.netlify.app',
  'http://localhost:4200'
];

// API
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === '22P02' || err.code === '23502' || err.code === '22003') {
    res.status(400).send({ msg: 'Bad Request' });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
});

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Route not found' });
});

app.listen(port, () =>
  console.log(`Backend running on http://localhost:${port}`)
);

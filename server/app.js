require('dotenv').config();
require('@babel/register');
const path = require('path')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const express = require('express');
const logger = require('morgan');
const dbCheck = require('./src/middlewares/dbCheck');
const isAuth = require('./src/middlewares/isAuth');

const getEmployeesRoute = require('./src/routes/getEmployees.route');

const app = express();
const PORT = process.env.PORT || 3001;

const sessionConfig = {
  name: 'PortalCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Secret word',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionConfig));
app.use(logger('dev'));

app.use('/login', (req, res, next) => {
  // console.log('session=>', req.session);
  next();
});

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dbCheck);

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/employees', getEmployeesRoute);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

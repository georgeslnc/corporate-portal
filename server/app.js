require('dotenv').config();
require('@babel/register');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const express = require('express');

// рекварим МИДЛВЕЙРЫ
const dbCheck = require('./src/middlewares/dbCheck');
const isAuth = require('./src/middlewares/isAuth');

// реквайрим РОУТЫ
const getEmployeesRoute = require('./src/routes/getEmployees.route');
const application = require('./src/routes/application.route');

const app = express();
const PORT = process.env.PORT || 3001;

// НАЧАЛО конфига Куки
const sessionConfig = {
  name: 'PortalCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999,
    httpOnly: true,
  },
};
app.use(session(sessionConfig)); // Подключаем сессии как middleware.
app.use('/login', (req, res, next) => {
  // console.log('session=>', req.session);
  next();
});
// КОНЕЦ конфига Куки

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dbCheck);
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

// РОУТЫ
app.use('/employees', getEmployeesRoute);
app.use('/application', application);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

require('dotenv').config();
require('@babel/register');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const express = require('express');
const logger = require('morgan');

const app = express();

// new vadim

const http = require('http').Server(app);
// eslint-disable-next-line import/no-extraneous-dependencies
const socketIO = require('socket.io')(http, {
  cors: {
    credentials: true,
    // origin: 'http://localhost:5173',
    origin: '*',
    method: ['GET', 'POST']
  },
});
const dbCheck = require('./utils/dbCheck');

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  socket.on('newUser', (data) => {
    users.push(data);
    socketIO.emit('newUserResponse', users);
  });
  // console.log('serv data----------------------------',data);

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});
// end new

// рекварим МИДЛВЕЙРЫ

const isAuth = require('./middlewares/isAuth');

const getEmployeesRoute = require('./routes/getEmployees.route');
const getNewsRoute = require('./routes/getNews.route');
const application = require('./routes/application.route');
const authRouter = require('./routes/auth.router');
const addFileRouter = require('./routes/files/addFile.route');
const employeesRouter = require('./routes/admin/addEmployees.route');

const PORT = process.env.PORT || 3000;

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
// app.use(dbCheck);

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/employees', getEmployeesRoute);
app.use('/news', getNewsRoute);
app.use('/application', application);
app.use('/auth', authRouter);
app.use('/documents', addFileRouter);
app.use('/admin', employeesRouter);

http.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
  dbCheck();
});

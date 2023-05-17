require('dotenv').config();
require('@babel/register');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const express = require('express');

const app = express();

// new vadim

const http = require('http').Server(app);
// eslint-disable-next-line import/no-extraneous-dependencies
const socketIO = require('socket.io')(http, {
  cors: {
  credentials: true,
  origin: 'http://localhost:5173',
  },
});

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
  
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});

// end new

// рекварим МИДЛВЕЙРЫ
const dbCheck = require('./src/middlewares/dbCheck');
const isAuth = require('./src/middlewares/isAuth');

// реквайрим РОУТЫ
const getEmployeesRoute = require('./src/routes/getEmployees.route');

const PORT = process.env.PORT || 3000;

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
  origin: ['http://localhost:5173','http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));

// РОУТЫ
app.use('/employees', getEmployeesRoute);

http.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

require('dotenv').config();
require('@babel/register');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const express = require('express');
const logger = require('morgan');

const app = express();

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    credentials: true,
    origin: '*',
    method: ['GET', 'POST']
  },
});
// end new

const WebSocket = require('ws');
const { WebSocketServer } = require('ws');
const dbCheck = require('./utils/dbCheck');

const wss = new WebSocketServer({ port: 4000 });

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

// рекварим МИДЛВЕЙРЫ
const isAuth = require('./middlewares/isAuth');

const getEmployeesRoute = require('./routes/getEmployees.route');
const getTodosRoute = require('./routes/getTodos.route');
const getNewsRoute = require('./routes/getNews.route');
const application = require('./routes/application.route');
const authRouter = require('./routes/auth.router');
const addFileRouter = require('./routes/files/addFile.route');
const employeesRouter = require('./routes/admin/addEmployees.route');
const deleteEmployeesRouter = require('./routes/deleteEmployees.route');

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
app.use('/todos', getTodosRoute);
app.use('/news', getNewsRoute);
app.use('/application', application);
app.use('/auth', authRouter);
app.use('/documents', addFileRouter);
app.use('/admin', employeesRouter);
app.use('/deleteemployees', deleteEmployeesRouter);

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
  dbCheck();
});

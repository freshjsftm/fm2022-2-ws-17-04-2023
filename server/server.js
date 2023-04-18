const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { Message } = require('./models');
const CONSTANTS = require('./constants');
const {
  SOCKET_EVENTS: { NEW_MESSAGE, ERROR_MESSAGE },
} = CONSTANTS;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5000',
  },
});

io.on('connection', (socket) => {
  console.log('=======>>>  connection to socket');
  socket.on(NEW_MESSAGE, async (newMessage) => {
    try {
      console.log('newMessage =======>>> ', newMessage);
      const saveMessage = await Message.create(newMessage);
      io.emit(NEW_MESSAGE, saveMessage);
    } catch (error) {
      socket.emit(ERROR_MESSAGE, error);
    }
  });
  socket.on('disconnect', (reason) => {
    console.log('reason =======>>> ', reason);
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('server started at port = ', port);
});

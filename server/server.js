const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { Message } = require('./models');

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('=======>>>  connection to socket');
  socket.on('newMessage', async (newMessage) => {
    try {
      console.log('newMessage =======>>> ', newMessage);
      const saveMessage = await Message.create(newMessage);
      io.emit('newMessage', saveMessage);
    } catch (error) {
      socket.emit('errorMessage', error);
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

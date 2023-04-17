const express = require('express');
const cors = require('cors');
const MessageController = require('./controllers/message.controller');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', MessageController.getAllMessages);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = app;

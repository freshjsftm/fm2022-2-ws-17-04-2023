const { Message } = require('../models');

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({}).sort('createdAt').limit(2).skip(2);
    res.status(200).send({ data: messages });
  } catch (error) {
    next(error);
  }
};

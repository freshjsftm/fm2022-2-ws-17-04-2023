const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaMessage = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timeseries: true,
    versionKey: false,
  }
);

const Message = mongoose.model('Message', schemaMessage);

module.exports = Message;

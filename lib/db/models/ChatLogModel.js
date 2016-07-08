'use strict';

module.exports = (ioc) => {
  const Schema = ioc.mongoose.Schema;

  let schema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, required: true },
    room: {type: String, required: true },
    message: { type: String, required: true }
  });

  schema.index({ '_user': 1, 'timestamp': -1 });
  schema.index({ 'room': 1, 'timestamp': -1 });

  return ioc.mongoose.model('ChatLog', schema);
};

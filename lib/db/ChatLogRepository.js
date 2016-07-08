'use strict';

class ChatLogRepository {
  constructor(ioc) {
    this.Model = ioc.ChatLogModel;
    this.q = ioc.q;
  }

  add(userId, room, message) {
    let chatLog = new this.Model({
      _user: userId,
      timestamp: new Date(),
      room,
      message
    });

    return this.q.nfcall(chatLog.save);
  }
}

module.exports = ChatLogRepository;

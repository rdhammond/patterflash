'use strict';

class ChatLogService {
  constructor(ioc) {
    this.chatLogs = new ioc.ChatLogRepository(ioc);
  }

  add(userId, room, message) {
    return this.chatLogs.add(userId, room, message);
  }
}

module.exports = ChatLogService;

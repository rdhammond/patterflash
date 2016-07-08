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

    let deferred = this.q.defer();

    chatLog.save((err) => {
      if (err)
        return deferred.reject(err);

      deferred.resolve();
    });

    return deferred.promise;
  }
}

module.exports = ChatLogRepository;

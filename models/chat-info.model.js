class Msg {
  constructor(uid, name, msg) {
    this.uid = uid;
    this.name = name;
    this.msg = msg;
  }
}

class ChatMsg {
  constructor() {
    this.msg = [];
    this.users = {};
  }

  get last10() {
    this.msg = this.msg.splice(0, 10);
    return this.msg;
  }

  get usersArr() {
    return Object.values(this.users);
  }

  sendMsg(uid, name, msg) {
    this.msg.unshift(new Msg(uid, name, msg));
  }

  connectUser(user) {
    this.users[user.id] = user;
  }

  disconnect(id) {
    delete this.users[id];
  }
}

module.exports = ChatMsg;

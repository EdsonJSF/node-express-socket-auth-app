const { validJWT } = require("../helpers");
const { ChatMsg } = require("../models");

const chatMsg = new ChatMsg();

const socketController = async (socket, io) => {
  const token = socket.handshake.headers.authorization;
  const user = await validJWT(token);
  if (!user) return socket.disconnect();

  socket.join(user.id);

  // Add user
  chatMsg.connectUser(user);
  io.emit("users", chatMsg.usersArr);
  socket.emit("get-mesages", chatMsg.last10);

  socket.on("disconnect", () => {
    chatMsg.disconnect(user.id);
    io.emit("users", chatMsg.usersArr);
  });

  socket.on("send-msg", ({ uid, msg }) => {
    if (uid) {
      socket.to(uid).emit("private-mesages", { user: user.name, msg });
    } else {
      chatMsg.sendMsg(user.id, user.name, msg);
      io.emit("get-mesages", chatMsg.last10);
    }
  });
};

module.exports = {
  socketController,
};

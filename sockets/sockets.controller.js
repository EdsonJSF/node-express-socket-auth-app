const { validJWT } = require("../helpers");
const { ChatMsg } = require("../models");

const chatMsg = new ChatMsg();

const socketController = async (socket, io) => {
  const token = socket.handshake.headers.authorization;
  const user = await validJWT(token);
  if (!user) return socket.disconnect();

  // Add user
  chatMsg.connectUser(user);
  io.emit("users", chatMsg.usersArr);

  socket.on("disconnect", () => {
    chatMsg.disconnect(user.id);
    io.emit("users", chatMsg.usersArr);
  });
};

module.exports = {
  socketController,
};

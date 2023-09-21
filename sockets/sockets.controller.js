const { validJWT } = require("../helpers");

const socketController = async (socket) => {
  const token = socket.handshake.headers.authorization;
  const user = await validJWT(token);
  if (!user) return socket.disconnect();

  console.log("Se conecto", user.name);
};

module.exports = {
  socketController,
};

const socketController = (socket) => {
  console.log("Cllient Conected", socket.id);
};

module.exports = {
  socketController,
};

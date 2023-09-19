const socketChat = io();

socketChat.on("connect", () => {
  console.log("Socket chat");
});

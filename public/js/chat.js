const url = "http://localhost:8000/api";

let user = null;
let socket = null;

const redirect = () => {
  localStorage.clear();
  window.location = "index.html";
};

const validJWT = async () => {
  const token = localStorage.getItem("token") || "";

  if (!token) {
    redirect();
    throw new Error("No token");
  }

  try {
    const resp = await fetch(`${url}/auth`, {
      headers: { "Content-Type": "application/json", Authorization: token },
    });

    const { data } = await resp.json();
    localStorage.setItem("token", data.token);
    user = data.user;
    document.title = user.name;

    await connectSocket();
  } catch {
    redirect();
  }
};

const connectSocket = async () => {
  const socketChat = io({
    extraHeaders: {
      authorization: localStorage.getItem("token"),
    },
  });

  socketChat.on("connect", () => {});
};

const main = async () => {
  await validJWT();
};

main();

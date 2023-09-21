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
  } catch {
    redirect();
  }
};

const main = async () => {
  await validJWT();
};

main();

const socketChat = io();

socketChat.on("connect", () => {});

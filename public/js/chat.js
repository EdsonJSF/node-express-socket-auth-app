const url = "http://localhost:8000/api";

let user = null;
let socketChat = null;

/* HTML Ref */
const txtUid = document.querySelector("#txtUid");
const txtMsg = document.querySelector("#txtMsg");
const ulUsers = document.querySelector("#ulUsers");
const ulMsg = document.querySelector("#ulMsg");
const singoutBtn = document.querySelector("#singoutBtn");

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
  socketChat = io({
    extraHeaders: {
      authorization: localStorage.getItem("token"),
    },
  });

  socketChat.on("connect", () => {});

  socketChat.on("disconnect", () => {});

  socketChat.on("users", drawUsers);

  socketChat.on("get-mesages", drawMessages);

  socketChat.on("private-mesages", () => {
    // TODO
  });
};

const drawUsers = (users = []) => {
  let usersHTML = "";
  users.forEach(({ uid, name }) => {
    /* html */
    usersHTML += `
      <li>
        <p>
          <h5 class="text-success">${name}</h5>
          <span class="fs-6 text-muted">${uid}</span>
        </p>
      </li>
    `;
  });

  ulUsers.innerHTML = usersHTML;
};

const drawMessages = (messages = []) => {
  console.log(messages);
  let messagesHTML = "";
  messages.forEach(({ name, msg }) => {
    /* html */
    messagesHTML += `
      <li>
        <p>
          <span class="text-primary">${name}</span>
          <span >${msg}</span>
        </p>
      </li>
    `;
  });

  ulMsg.innerHTML = messagesHTML;
};

txtMsg.addEventListener("keyup", ({ keyCode }) => {
  const msg = txtMsg.value;
  const uid = txtUid.value;

  if (keyCode !== 13) return;
  if (msg.trim().length === 0) return;
  if (uid.trim().length === 0) return;

  socketChat.emit("send-msg", { msg, uid });

  txtMsg.value = "";
});

const main = async () => {
  await validJWT();
};

main();

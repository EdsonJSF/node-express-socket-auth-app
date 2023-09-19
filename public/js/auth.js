const url = "http://localhost:8000/api/auth";

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = {};

  for (const el of form.elements) {
    if (el.name.length) {
      formData[el.name] = el.value;
    }
  }

  fetch(`${url}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((resp) => resp.json())
    .then(({ data }) => {
      localStorage.setItem("token", data.token);
    })
    .catch(console.warn);
});

function handleCredentialResponse(response) {
  // Google Token || ID_TOKEN
  const body = { id_token: response.credential };

  fetch(`${url}/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then(({ data }) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user.email);
    })
    .catch(console.warn);
}

const googleSingoutBtn = document.getElementById("googleSingoutBtn");
googleSingoutBtn.onclick = () => {
  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};

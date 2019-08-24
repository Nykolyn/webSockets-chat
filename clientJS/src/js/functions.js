import { refs, socket } from "./app";
let userName = null;
export const showLoggedName = name => {
  refs.usersActions.insertAdjacentHTML(
    "beforeend",
    `<li><p>User ${name} connected</p></li>`
  );
  socket.emit("users-online");
  // setTimeout(() => {
  //   refs.usersActions.innerHTML = "";
  // }, 2000);
};

export const handleLogin = e => {
  e.preventDefault();
  const [name] = e.currentTarget.elements;
  socket.emit("login", name.value);
  socket.emit("users-online");
  userName = name.value;
  refs.loginPage.classList.add("hide");
};

export const showDisconectedUser = name => {
  refs.usersActions.insertAdjacentHTML(
    "beforeend",
    `<p>User ${name} is out, its even better without him... </p>`
  );
};

export const appendMsgToChat = ({ name, msg }) => {
  refs.messagesList.insertAdjacentHTML(
    "afterbegin",
    `<li>${name}: ${msg}, ${new Date().toLocaleTimeString()}<li>`
  );
};

export const handleMsgSubmit = e => {
  e.preventDefault();
  const [message] = e.currentTarget.elements;
  const msgToAdd = { name: userName, msg: message.value };
  appendMsgToChat(msgToAdd);
  socket.emit("chat-message", msgToAdd);
};

export const showOnlineUsers = users => {
  refs.usersOnline.innerHTML = users.length;
};

export const showIsTyping = name => {
  console.log("show typing");
  if (document.querySelector(`.${name}`)) return;
  refs.isTyping.insertAdjacentHTML(
    "afterbegin",
    `<p class="${name}">User ${name} is typing...</p>`
  );
};

export const clearIsTyping = name => {
  console.log("clearTyping");
  const elToClear = document.querySelector(`.${name}`);
  elToClear.remove();
};

export const handleMsgTyping = ({ target: { value } }) => {
  console.log(value);
  if (value !== "") return socket.emit("is-typing", userName);
  if (value === "") return socket.emit("clear-typing", userName);
};

export const userDisconecting = e => {
  e.preventDefault();
  console.log("are you sure");
  socket.emit("user-disconnecting", userName);
  socket.emit("users-online");
};

const refs = {
  editor: document.querySelector(".message-editor"),
  commentMsg: document.querySelector("textarea"),
  list: document.querySelector(".messages-list"),
  usernameInput: document.querySelector(".username-input"),
  isTypingMsg: document.querySelector(".is-typing")
};

const userName = prompt("Enter your name") || "Anonim";

const showTyping = name =>
  (refs.isTypingMsg.innerHTML = `User ${name} is typing...`);

const showTypingUser = () => {
  if (refs.commentMsg.value.length >= 1) {
    socket.emit("typing", userName);
    showTyping(userName);
  }

  if (refs.commentMsg.value === "") {
    refs.isTypingMsg.innerHTML = "";
  }
};

export const appendJoinedMessage = name =>
  document.body.insertAdjacentHTML("afterbegin", `<h1>Joined as ${name}</h1>`);

const appendMessage = ({ name, message }) =>
  refs.list.insertAdjacentHTML(
    "afterbegin",
    `<li>
  <p><span>${name}: </span>${message}</p></li>`
  );

const socket = io("ws://localhost:3004");

const handleMessageSubmit = e => {
  e.preventDefault();

  const form = e.currentTarget;
  const [message] = form.elements;

  const payload = {
    name: userName,
    message: message.value
  };

  socket.emit("chat-message", payload);
  appendMessage(payload);
};

socket.on("typing", showTyping);
socket.on("chat-message", appendMessage);
refs.editor.addEventListener("submit", handleMessageSubmit);
refs.commentMsg.addEventListener("change", showTypingUser);

import io from "socket.io-client";
import * as functions from "./functions";

export const socket = io("ws://localhost:3004");

export const refs = {
  form: document.querySelector(".form"),
  loginPage: document.querySelector(".login"),
  usersActions: document.querySelector(".user-actions"),
  chatForm: document.querySelector(".chat-form"),
  messagesList: document.querySelector(".messages"),
  usersOnline: document.querySelector(".users-online"),
  inputMessage: document.querySelector(".inputMessage"),
  isTyping: document.querySelector(".is-typing")
};

socket.on("login", functions.showLoggedName);
socket.on("users-online", functions.showOnlineUsers);
socket.on("is-typing", functions.showIsTyping);
socket.on("clear-typing", functions.clearIsTyping);
socket.on("user-disconnecting", functions.showDisconectedUser);
socket.on("chat-message", functions.appendMsgToChat);

refs.form.addEventListener("submit", functions.handleLogin);
refs.chatForm.addEventListener("submit", functions.handleMsgSubmit);
refs.inputMessage.addEventListener("input", functions.handleMsgTyping);
window.addEventListener("beforeunload", functions.userDisconecting);

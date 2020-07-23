const socket = io(`http://localhost:3000`);
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
console.log(socket);

const name = prompt("Name: ");
appendMsg("You joined");
socket.emit("new-user", name);
//Connect / Disconnect
socket.on("user-connected", (data) => {
  appendMsg(`${data} connected`);
});
socket.on("user-dc", (data) => {
  appendMsg(`${data} disconnected`);
});

//Send msg
socket.on("chat-message", (data) => {
  appendMsg(`${data.name} : ${data.message}`);
});

//Form submit
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMsg(`${name} : ${message}`);
  socket.emit("send-chat-msg", message);
  messageInput.value = "";
});

//Create div
function appendMsg(message) {
  const messageElement = document.createElement("div");

  messageElement.innerHTML = message;
  messageContainer.append(messageElement);
}

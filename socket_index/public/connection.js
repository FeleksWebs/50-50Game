const socket = io(`http://localhost:3000`);
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
console.log("Script turned on");
console.log(socket);

socket.on("ServerToClient", (data) => {
  console.log(data);
});

function testCon() {
  socket.emit("ClientToServer", { ToServer: "Hello" });
}
testCon();

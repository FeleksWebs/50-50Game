import React, { Component, useState } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3000";
let socket = io(ENDPOINT);
//Recive user info

let CurrentName = prompt("Your Name?");
//Create new connection
socket.emit("NewConnection", { name: CurrentName });

function Heads() {
  let TempUsers = [];
  const [CurrentUsers, NewUsers] = useState([]);

  function Update_List(data) {
    for (var i = 0; i < data.length; i++) {
      if (!TempUsers.includes(data[i].name)) {
        TempUsers.push(data[i].name);
      }
    }
    NewUsers(TempUsers);
  }

  socket.on("Check Current Users", (data) => {
    Update_List(data);
    console.log(CurrentUsers);
  });

  //*** ON DISCONNECT USE Update_List to update STATE with new array***
  //Disconnecting Socket
  socket.on("UserDisconnect", (data) => {
    console.log(`${data} has disconnected`);

    if (CurrentUsers.includes(data)) {
      console.log("___________");
    }
    console.log(CurrentUsers);
  });

  return (
    <div>
      <h1>New Room : Heads</h1>
      <button>Check Current Users</button>
      <ul>
        {CurrentUsers.map((item) => (
          <li key={`User_${item}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Heads;

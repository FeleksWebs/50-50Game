import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Heads = ({ location }) => {
  //Use socket.io to update UseState
  const [CurrentUsers, NewUsers] = useState([]);
  const ENDPOINT = "http://localhost:3000";
  useEffect(() => {
    console.log(location.search);

    let socket = io(ENDPOINT);

    let CurrentName = prompt("Your Name?");
    if (!CurrentName) {
      return alert("Something not filled please reload page");
    }

    socket.emit("join", { name: CurrentName, CoinFace: "Heads" });

    var DisplayUsers = [];
    socket.on("UsersInRoom", (data) => {
      DisplayUsers = [];
      for (var item of data.user) {
        DisplayUsers.push(item.name);
      }
      NewUsers(DisplayUsers);
    });
  }, [ENDPOINT, location.search]);

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
};

export default Heads;

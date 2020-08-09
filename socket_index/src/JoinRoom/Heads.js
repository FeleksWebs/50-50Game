import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Heads.css";

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
      <div className="row justify-content-end">
        <div className="col">
          {CurrentUsers.map((item, index) => {
            if (index === 0) {
              return <div className="col">{item}</div>;
            }
          })}
        </div>
        <div className="col">coin</div>
        <div className="col">
          {CurrentUsers.map((item, index) => {
            if (index === 1) {
              return <div className="col">{item}</div>;
            }
          })}
        </div>
      </div>

      <h1>New Room : Heads</h1>
      <ul>
        {CurrentUsers.map((item) => (
          <li key={`User_${item}`} className="NameContainer">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Heads;

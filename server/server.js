const PORT = 3000;
const io = require("socket.io").listen(PORT);

const {
  FindAvailableRooms,
  GetRoomUsers,
  GenerateRoomKey,
} = require("./RoomConnections");

const { AllUsers, addUser, removeUser } = require("./Users");

io.on("connection", (socket) => {
  //////////////SQL CONNECTION//////////////////////
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });
  connection.connect();
  connection.on("error", function (err) {
    console.log(err.code);
  });
  connection.on("connect", function (err) {
    // If no error, then good to proceed.
    console.log("SQL Connected");
  });
  //////////////END OF SQL//////////////////////
  //Join a room
  socket.on("join", ({ name, CoinFace }) => {
    console.log("Socket : " + socket.id + " connected || User is: " + name);
    //Get first available room
    let userRoom = "";

    //Look for room that -1) has free slot ,2)Is the oposite of CoinFace
    if (FindAvailableRooms(AllUsers, CoinFace)[0]) {
      userRoom = FindAvailableRooms(AllUsers, CoinFace)[0].room;
    } else {
      userRoom = GenerateRoomKey();
    }

    //Create User Object
    const { user } = addUser({
      id: socket.id,
      name: name,
      room: userRoom,
      face: CoinFace,
    });

    socket.join(user.room);
    socket.roomName = userRoom;

    if (user) {
      //emit to everyone in that room
      var CurrentRoomUsers = GetRoomUsers(user.room, AllUsers);
      io.to(user.room).emit("UsersInRoom", {
        user: CurrentRoomUsers,
      });
    }
  });

  //DISCONNECT
  socket.on("disconnect", () => {
    //Remove socket from Users.js
    removeUser(socket.id);

    //Update that room with new users..
    var CurrentRoomUsers = GetRoomUsers(socket.roomName, AllUsers);
    io.to(socket.roomName).emit("UsersInRoom", {
      user: CurrentRoomUsers,
    });

    //Delete socket
    delete socket;
  });
});

console.log(`Server has started on port ${PORT}`);

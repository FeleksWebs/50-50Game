const PORT = 3000;
const io = require("socket.io").listen(PORT);

const {
  addUser,
  removeUser,
  GetRoomUsers,
  FindAvailableRooms,
  GenerateRoomKey,
} = require("./Users");

//On connect
io.on("connection", (socket) => {
  console.log("Socket : " + socket.id + " connected");

  //Join a room
  socket.on("join", ({ name, CoinFace }) => {
    //Get first available room
    let userRoom = "";
    console.log("Before lobby");
    //1.) FindAvailableRooms is having issues after loop
    //2.) if FindAvailableRooms is empty, create new key

    if (FindAvailableRooms()) {
      userRoom = FindAvailableRooms()[0].room;
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
    console.log("After lobby");

    console.log(FindAvailableRooms());
    if (user) {
      //emit to everyone in that room

      var CurrentRoomUsers = GetRoomUsers(user.room);
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
    var CurrentRoomUsers = GetRoomUsers(socket.roomName);
    io.to(socket.roomName).emit("UsersInRoom", {
      user: CurrentRoomUsers,
    });

    //Delete socket
    delete socket;
  });
});

console.log(`Server has started on port ${PORT}`);

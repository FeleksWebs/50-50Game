const io = require("socket.io").listen(3000);

var Users = {};
var UsersList = [];

//On connect
io.on("connection", (socket) => {
  console.log("Socket : " + socket.id + " connected");

  //New Connection
  socket.on("NewConnection", (user) => {
    console.log(user);
    if (!user.name) {
      return console.log("preventing null");
    }

    socket.nickname = user.name;
    var User = {
      name: user.name,
      id: socket.id,
    };
    Users[socket.nickname] = User;
    UsersList.push(Users[socket.nickname]);
    //Send List of Current connected sockets
    if (UsersList.length <= 2) {
      io.sockets.emit("Check Current Users", UsersList);
    }
  });

  socket.on("Check List of Users", () => {
    io.sockets.emit("Check Current Users", UsersList);
  });

  // ***WHEN DISCONNECTING, PASS USERLIST BACK TO CLIENT***
  //On disconnect
  socket.on("disconnect", () => {
    //Removing User from Arrays
    io.emit("UserDisconnect", socket.nickname);
    for (var i = 0; i < UsersList.length; i++) {
      if (UsersList[i].name == socket.nickname) {
        UsersList.splice(i, 1);
        console.log(UsersList);
        console.log(`Removing ${socket.nickname} from array list`);
      }
    }

    //Deleting socket
    delete Users[socket.nickname];
  });
});

console.log(`Server has started on port ${3000}`);

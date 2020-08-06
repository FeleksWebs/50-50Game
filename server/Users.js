let AllUsers = [];

const addUser = ({ id, name, room, face }) => {
  //Checking if user already taken
  const existingUser = AllUsers.find(
    (user) => user.room === room && user.name === name
  );
  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };
  const user = { id, name, room, face };
  AllUsers.push(user);
  return { user };
};

const GetRoomUsers = (RoomKey) => {
  if (RoomKey) {
    var UsersInRoom = [];
    for (item of AllUsers) {
      if (RoomKey === item.room) {
        UsersInRoom.push(item);
      }
    }
    return UsersInRoom;
  }
};

const removeUser = (id) => {
  for (var a = 0; a < AllUsers.length; a++) {
    if (AllUsers[a].id == id) {
      var removeIndex = AllUsers.map(function (item) {
        return item.id;
      }).indexOf(AllUsers[a].id);
      let roomNr = "";
      roomNr += AllUsers[a].room;
      return AllUsers.splice(removeIndex, 1);
    }
  }
};

const FindAvailableRooms = () => {
  let myArr = AllUsers;
  var table = {};
  for (var i = 0; i < myArr.length; i++) {
    //if room is already in table object
    if (myArr[i].room in table === false) {
      table[myArr[i].room] = [1, [myArr[i]]];
    } else {
      //It contains room name
      table[myArr[i].room][0] += 1;
      //push duplicated arr to [1]
      table[myArr[i].room][1].push(myArr[i]);
    }
  }
  not_connected = [];
  for (const [key, value] of Object.entries(table)) {
    //value[0] check each array content nr
    if (value[0] < 2) {
      //if content less than 2 push all arrays to not_connected
      not_connected.push(table[key][1][0]);
    }
  }
  //returning a first room that is free
  if (not_connected.length === 0) {
    return false;
  } else {
    return not_connected;
  }
};

function GenerateRoomKey() {
  var length = 7;
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  addUser,
  removeUser,
  GetRoomUsers,
  FindAvailableRooms,
  GenerateRoomKey,
};

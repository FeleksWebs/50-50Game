const GetRoomUsers = (RoomKey, Arr) => {
  if (RoomKey) {
    var UsersInRoom = [];
    for (item of Arr) {
      if (RoomKey === item.room) {
        UsersInRoom.push(item);
      }
    }
    return UsersInRoom;
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

const FindAvailableRooms = (data, coinFace) => {
  let myArr = data;
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
      //Getting the oposite of coinFace
      if (table[key][1][0].face !== coinFace) {
        not_connected.push(table[key][1][0]);
      }
    }
  }
  //returning a first room that is free
  if (not_connected.length === 0) {
    return false;
  } else {
    return not_connected;
  }
};
module.exports = { GetRoomUsers, GenerateRoomKey, FindAvailableRooms };

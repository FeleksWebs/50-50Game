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

module.exports = {
  AllUsers,
  addUser,
  removeUser,
};

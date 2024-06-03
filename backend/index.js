const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const PORT = 3001;
const expressServer = app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

// All users
const UsersState = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("joinRoom", ({ name, roomCode }) => {
    const prevRoom = getUser(socket.id)?.room;

    // Leave previous room
    if (prevRoom) {
      socket.leave(prevRoom);
      console.log(`${name} left room: ${prevRoom}`);
    }

    // Add user to user state in new room
    const user = userActivate(socket.id, name, roomCode);

    // Cannot update previous room users list until after the state update in activate user
    if (prevRoom) {
      io.to(prevRoom).emit("updateUsers", {
        users: getUsersInRoom(prevRoom),
      });
    }

    // Join new room
    socket.join(user.room);
    console.log(`${user.name} (${user.id}) has joined room: ${user.room}`);

    // Update user list for room
    io.to(user.room).emit("updateUsers", {
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    userLeave(socket.id);

    if (user) {
      io.to(user.room).emit("updateUsers", {
        users: getUsersInRoom(user.room),
      });
    }

    console.log(`User ${socket.id} disconnected`);
  });

  socket.on("sendMessage", (data) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      io.to(room).emit("receiveMessage", data);
    }
  });

  socket.on("sendPlaylist", (data) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      io.to(room).emit("receivePlaylist", data);
    }
  });
});

// User functions
function userActivate(id, name, room) {
  const user = { id, name, room };
  UsersState.setUsers([
    ...UsersState.users.filter((user) => user.id !== id),
    user,
  ]);
  return user;
}

function userLeave(id) {
  UsersState.setUsers(UsersState.users.filter((user) => user.id !== id));
}

function getUser(id) {
  return UsersState.users.find((user) => user.id === id);
}

function getUsersInRoom(room) {
  return UsersState.users.filter((user) => user.room === room);
}

function getAllActiveRooms() {
  return Array.from(new Set(UsersState.users.map((user) => user.room)));
}

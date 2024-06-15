const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { getPlaylistDetails } = require("./spotify.js");

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

// All rooms
const RoomsState = {
  rooms: [],
  setRooms: function (newRoomsArray) {
    this.rooms = newRoomsArray;
  },
  getRoom: function (roomCode) {
    return this.rooms.find(room => room.roomCode === roomCode);
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

    if (!isRoomActive(roomCode)) {
      roomActivate(roomCode);
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
    socket.emit('receivePlaylist', RoomsState.getRoom(user.room).playlistDetails);


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

      if (!isRoomActive(user.room)) {
        roomDeactivate(user.room)
      }
    }

    console.log(`User ${socket.id} disconnected`);
  });

  socket.on("sendMessage", (data) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      io.to(room).emit("receiveMessage", data);
    }
  });

  socket.on("sendPlaylist", async (data) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      const playlistId = data.playlistId;
      try {
        const playlistDetails = await getPlaylistDetails(playlistId);
        updateRoomDetails(room, { playlistDetails })
        io.to(room).emit("receivePlaylist", playlistDetails);
      } catch (error) {
        socket.emit('receivePlaylist', {})
      }
    }
  });

  socket.on("sendGameActive", (data) => {
    const room = getUser(socket.id)?.room;
    const gameActive = data.gameActive;
    if (room) {
      updateRoomDetails(room, { gameActive })
      io.to(room).emit("receiveGameActive", gameActive);
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

function roomActivate(roomCode) {
  const room = { roomCode, playlistDetails: {}, gameActive: false };
  RoomsState.setRooms([
    ...RoomsState.rooms.filter((room) => room.roomCode !== roomCode),
    room,
  ]);
  return room;
}

function roomDeactivate(roomCode) {
  RoomsState.setRooms(RoomsState.rooms.filter((room) => room.roomCode !== roomCode));
}

function isRoomActive(roomCode) {
  return getAllActiveRooms().includes(roomCode);
}

function updateRoomDetails(roomCode, updatedDetails) {
  const updatedRooms = RoomsState.rooms.map(room => {
    if (room.roomCode === roomCode) {
      return { ...room, ...updatedDetails };
    }
    return room;
  });
  RoomsState.setRooms(updatedRooms);
}
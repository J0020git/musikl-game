const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("createRoom", (data) => {
    console.log(data);
  })
});

const port = 3001;
server.listen(port, () => {
  console.log(`Backend server running port ${port}`);
});

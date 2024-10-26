const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors')
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (Socket) => {
    console.log(Socket.id);

    Socket.on("disconnect", () => {
        console.log("User Disconnected", Socket.id)
    });
});



server.listen(3001, () => {
    console.log('Server running!');
});
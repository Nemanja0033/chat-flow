require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");

const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.ORIGIN || "http://localhost:5173";

app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ORIGIN,
        methods: ["GET", "POST"],
    }
});

io.on("connection", (Socket) => {
    console.log(`User Connected: ${Socket.id}`);

    Socket.on("join_room", (data) => {
        Socket.join(data);
        console.log(`User with ID: ${Socket.id} joined a room ID: ${data}`);
    });

    Socket.on("send_message", (data) => {
        Socket.to(data.room).emit("receive_message", data);
    });

    Socket.on("disconnect", () => {
        console.log(`User Disconnected: ${Socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
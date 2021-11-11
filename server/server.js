//requires the dotenv library and invokes its config function
const dotenv = require('dotenv').config({ debug: process.env.DEBUG });
const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const cookieParser = require('cookie-parser'); 
const jwt = require("jsonwebtoken");
const mongoose = require('./config/mongoose.config');

const server = app.listen(process.env.DB_PORT, () => {
    console.log('Listening on port:' + process.env.DB_PORT)
});

//enables the app to send and read cookies with each request/response
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://' + process.env.DB_HOST}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./routes/user.routes')(app);
require('./routes/course.routes')(app);
 
//initializes the socket, invokes a new instance of socket.io, & passes the express server instance
//always include a configuration settings object to prevent CORS errors
const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

{/*io.on("connection", socket => {
//each client that connects get their own socket id
console.log('successful handshake with socket id: ' + socket.id); */}

let sequenceNumberByClient = new Map();

//event fired every time a new client connects:
io.on("connection", (socket) => {
    console.log(`Client connected [socket id=${socket.id}]`);
    // initialize this client's sequence number
    sequenceNumberByClient.set(socket, 1);

    //sends each client its current sequence number
    setInterval(() => {
        for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
            client.emit("seq-num", sequenceNumber);
            sequenceNumberByClient.set(client, sequenceNumber + 1);
        }
    });
    
    //when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.log(`Client disconnected [socket id=${socket.id}]`);
    });
    //uses specific socket to create event listeners and emitters for clients
    //sends a message with "data" to ALL clients EXCEPT for the one that emitted the "event_from_client" event
    socket.on("added_new_course", data => {
        socket.broadcast.emit("new_course_added", data)
    });
    socket.on("canceled_course", data => {
        socket.broadcast.emit("course_canceled", data)
    });
    socket.on("updated_course", data => {
        socket.broadcast.emait("course_updated", data)
    });
    socket.on("registered_user", data => {
        socket.broadcast.emit("user_registered", data)
    });
    socket.on("authorized_user", data => {
        socket.broadcast.emit("user_authorized", data)
    });
    socket.on("updated_user", data => {
        socket.broadcast.emit("user_updated", data)
    });
    socket.on("enrolled_user", data => {
        socket.broadcast.emit("user_enrolled", data)
    });
    socket.on("removed_user", data => {
        socket.broadcast.emit("user_removed", data)
    });

});





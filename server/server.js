//requires the dotenv library and invokes its config function
const dotenv = require('dotenv').config();

//imports express and other libraries
const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const cookieParser = require('cookie-parser'); 
const jwt = require("jsonwebtoken");

//configure mongoose to connect
const mongoose = require('./config/mongoose.config');

//starts the app server listening
const server = app.listen(process.env.DB_PORT, () => {
    console.log(`Listening on port: ${process.env.DB_PORT}`)
});

//configure the express app server
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//adds the ability to use credentials with cookies
app.use(cors({credentials: true, origin: `http://${process.env.DB_HOST}`}));

//enables the app to send and read cookies with each request/response
app.use(cookieParser());

//adds routes to listen
require('./routes/user.routes')(app);
require('./routes/course.routes')(app);
 
//initializes the socket, invokes a new socket.io instance, and passes the express server
const io = require("socket.io")(server, {
    //includes a configuration settings object to prevent CORS errors
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

let sequenceNumberByClient = new Map();

//event fired every time a new client connects:
io.on("connection", (socket) => {
    //each client that connects get their own socket id
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
    socket.on("added_new_course", (newCourseObj) => {
        console.log("A new course was added.");
        console.log(newCourseObj);
        socket.broadcast.emit("new_course_added", newCourseObj);
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





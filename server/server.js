const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const cookieParser = require('cookie-parser'); 
const jwt = require("jsonwebtoken");
const mongoose = require('./config/mongoose.config');
const port = 8000;

//requires the dotenv library and invokes its config function
const dotenv = require('dotenv').config({ debug: process.env.DEBUG });
const buf = Buffer.from('hello world')
const opt = { debug: true }
const config = dotenv.parse(buf, opt)  
// expect a debug message because the buffer is not in KEY=VAL form

//enables the app to send and read cookies with each request/response
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./routes/user.routes')(app);
require('./routes/course.routes')(app);
 
const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

const payload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    admin: user.admin,
  };
   
const userToken = jwt.sign(payload, process.env.SECRET_KEY);
 
//initializes the socket: invokes a new instance of socket.io and passes the express server instance
//always include a configuration settings object to prevent CORS errors
const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
    // NOTE: Each client that connects get their own socket id!
    console.log('successful handshake with socket id: ' + socket.id);
    
    // Use specific socket to create event listeners and emitters for clients
    // send a message with "data" to ALL clients EXCEPT for the one that emitted the "event_from_client" event
    socket.on("added_new_course", data => {
        socket.broadcast.emit("new_course_added", data)
    });
    socket.on("canceled_course", data => {
        socket.broadcast.emit("course_canceled", data)
    });
    socket.on("updated_course", data => {
        socket.broadcast.emait("course_updated", data)
    });
});
  


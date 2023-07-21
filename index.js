
const express = require('express');
const app = express();
const http = require('http');
// creating http server and passing express as request handler
const server = http.createServer(app); //access a request handler
const path = require('path');
const socketio = require('socket.io');
const io = socketio(server);

app.use('/' , express.static(path.join(__dirname , 'public'))); 



const users = {};


io.on('connection' , (socket)=>{
    // console.log(socket.id)
    // console.log(`connection established with ${socket.id}`);

    socket.on('send-msg' , (data)=>{ //listen to some event
        // console.log(data);
        io.emit('received-msg' , {
            msg: data.msg,
            username: users[socket.id]
        })
    }) 

    socket.on('login' , (data)=>{
        // console.log(data,'sam');
        users[socket.id] = data.username; //mapping key/id's with username

    })

})



// static files ko use krne ke liye
app.use('/' , express.static(path.join(__dirname , 'public')));



const port = process.env.PORT || 3000;
server.listen(port , ()=>{
    console.log(`server connected at port ${port}`)
})

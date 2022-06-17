// Node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users={};

io.on('connection',socket=>{
  //same user has the socket and the functions are defined for him
    socket.on('new-user-joined',name_=>{
        console.log("New user",name_)
        users[socket.id]=name_;
        socket.broadcast.emit('user-joined',name_);
    }) ;

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    })

})
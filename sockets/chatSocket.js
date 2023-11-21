const socketIo = require("socket.io"); // Require the Socket.io module

function intializeSocket(server) {
    const io = socketIo(server, {
        pingTimeout: 60000,
        cors: {
            origin: "*"
        },
    });


    io.on('connection', (socket) => {
        socket.on('setup', (Data) => {

            // Data  -      userId
            socket.join(Data)
            socket.emit('connected')

        });

        socket.on('join', (room) => {
            socket.join(room);


        })

        socket.on('chatMessage', (message) => {


            if (message.userId === message.senderId) {

                // console.log("seding ...to developer " +message.senderId);
                socket.in(message.developerId).emit("message recieved", message);



            } else {
                // console.log("seding ...to user  " +message.senderId );

                socket.in(message.userId).emit("message recieved", message);
            }
        });



        socket.on('disconnect', () => {
            // console.log('A user disconnected');
        });
    });


}
module.exports = intializeSocket;
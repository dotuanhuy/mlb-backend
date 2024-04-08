
module.exports = function(io) {
    io.on('connection', function(socket) {
        console.log('A user connected')

        // io.emit('message', 'A new client has connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    })
}
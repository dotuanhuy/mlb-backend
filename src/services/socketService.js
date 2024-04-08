class SocketService {

    // connect
    connection(socket) {
        console.log(socket.id)
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        // event 

        socket.on('updateReview', (data) => {
            console.log('check data: ')
            socket.emit('review', data)
        })
    }

}

module.exports = new SocketService()

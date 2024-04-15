
class SocketService {

    // connect
    connection(socket) {
        // event 
        socket.on('send_review', ({reviews, _productId}) => {
            global._io.emit('receive_review', {reviews, _productId})
        })

        socket.on('disconnect', () => {
            
        });
    }

}

module.exports = new SocketService()

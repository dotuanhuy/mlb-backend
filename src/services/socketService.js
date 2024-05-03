const JWT = require('jsonwebtoken')

class SocketService {
    adminSocket = null

    connection(socket) {
        const token = socket?.handshake?.auth?.token
        if (token) {
            JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (!err && payload?.roleId === +process.env.ADMIN_ROLE) { 
                    this.adminSocket = socket
                }
            })
        }
        // event 
        socket.on('send_review', ({reviews, _productId}) => {
            global._io.emit('receive_review', {reviews, _productId})
        })
        socket.on('send_notification', ({typeText}) => {
            if (this.adminSocket?.id) {
                this.adminSocket.emit('receive_notification', {typeText})
            }
        })
        socket.on('disconnect', () => {
            
        });
    }

}

module.exports = new SocketService()

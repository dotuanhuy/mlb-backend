const db = require('../models/index')

module.exports = {
    getNotifications: () => {
        return new Promise((resolve, reject) =>{
            db.Notification.findAll({
                include: {
                    model: db.User, as: 'dataNotification',
                    attribute: ['id', 'firstName', 'lastName', 'avatar']
                },
                order: [['id', 'DESC']]
            })
            .then(resolve)
            .catch(reject)
        })
    },
    createNotification: ({ userId, typeId, content, typeText }) => {
        return new Promise((resolve, reject) => {
            db.Notification.create({
                userId,
                typeId,
                content,
                typeText,
                isRead: 0
            })
        })
    },
    updateIsRead: (id) => {
        return new Promise((resolve, reject) => {
            db.Notification.update({ isRead: 1 }, {
                where: { id }
            })
            .then(resolve)
            .catch(reject)
        })
    }
}
